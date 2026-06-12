<?php

namespace Tests\Feature;

use App\Models\Brand;
use App\Models\Car;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CarPhotosTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsAdmin(): User
    {
        return User::factory()->create();
    }

    public function test_store_saves_extra_photos_in_column_not_features(): void
    {
        Storage::fake('public');

        $user = $this->actingAsAdmin();
        $brand = Brand::factory()->create(['name' => 'BMW']);

        $response = $this->actingAs($user)->post('/cars', [
            'model' => '330e',
            'year' => 2020,
            'brand_id' => $brand->id,
            'price' => 23250,
            'kilometers' => 140000,
            'fuel' => 'Híbrido Plug-in',
            'transmission' => 'Automática',
            'power' => 292,
            'description' => 'Viatura de teste',
            'photos' => [
                UploadedFile::fake()->image('capa.jpg'),
                UploadedFile::fake()->image('extra1.jpg'),
                UploadedFile::fake()->image('extra2.jpg'),
            ],
        ]);

        $response->assertRedirect(route('cars.index'));

        $car = Car::first();
        $this->assertNotNull($car);
        $this->assertSame('330e', $car->model);
        $this->assertSame(2020, $car->year);
        $this->assertSame($brand->id, $car->brand_id);
        $this->assertEquals(23250, (float) $car->price);
        $this->assertSame(140000, $car->kilometers);
        $this->assertSame('Híbrido Plug-in', $car->fuel);
        $this->assertSame('Automática', $car->transmission);
        $this->assertSame(292, $car->power);
        $this->assertSame('Viatura de teste', $car->description);
        $this->assertNotNull($car->image);
        $this->assertCount(2, $car->extra_photos);
        $this->assertNull($car->features);
        $this->assertCount(2, $car->extra_photo_urls);
        Storage::disk('public')->assertExists($car->image);
        foreach ($car->extra_photos as $photo) {
            Storage::disk('public')->assertExists($photo);
        }
    }

    public function test_public_car_page_includes_all_photo_urls(): void
    {
        Storage::fake('public');

        $brand = Brand::factory()->create(['name' => 'BMW']);
        $main = UploadedFile::fake()->image('capa.jpg')->store('cars', 'public');
        $extra1 = UploadedFile::fake()->image('extra1.jpg')->store('cars', 'public');
        $extra2 = UploadedFile::fake()->image('extra2.jpg')->store('cars', 'public');

        $car = Car::create([
            'brand_id' => $brand->id,
            'model' => '330e',
            'year' => 2020,
            'price' => 23250,
            'image' => $main,
            'extra_photos' => [$extra1, $extra2],
        ]);

        $response = $this->get("/carros/{$car->id}");

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('CarroDetalhes')
            ->has('carro', fn ($carro) => $carro
                ->where('model', '330e')
                ->has('extra_photo_urls', 2)
                ->etc()
            )
        );
    }

    public function test_legacy_features_extra_photos_still_exposed_via_accessor(): void
    {
        $brand = Brand::factory()->create();
        $car = Car::create([
            'brand_id' => $brand->id,
            'model' => 'Legado',
            'year' => 2019,
            'price' => 10000,
            'image' => 'cars/capa.jpg',
            'features' => [
                'extra_photos' => ['cars/extra1.jpg', 'cars/extra2.jpg'],
            ],
        ]);

        $this->assertCount(2, $car->extra_photo_urls);
        $this->assertStringContainsString('cars/extra1.jpg', $car->extra_photo_urls[0]);
        $this->assertStringContainsString('cars/extra2.jpg', $car->extra_photo_urls[1]);
    }

    public function test_update_replaces_photos_and_keeps_other_fields(): void
    {
        Storage::fake('public');

        $user = $this->actingAsAdmin();
        $brand = Brand::factory()->create();
        $oldMain = UploadedFile::fake()->image('old.jpg')->store('cars', 'public');
        $oldExtra = UploadedFile::fake()->image('old-extra.jpg')->store('cars', 'public');

        $car = Car::create([
            'brand_id' => $brand->id,
            'model' => 'Antigo',
            'year' => 2018,
            'price' => 9000,
            'image' => $oldMain,
            'extra_photos' => [$oldExtra],
            'is_sold' => false,
        ]);

        $response = $this->actingAs($user)->put("/cars/{$car->id}", [
            'model' => 'Atualizado',
            'year' => 2021,
            'brand_id' => $brand->id,
            'price' => 15000,
            'kilometers' => 50000,
            'fuel' => 'Diesel',
            'transmission' => 'Manual',
            'power' => 110,
            'description' => 'Nova descrição',
            'is_sold' => true,
            'photos' => [
                UploadedFile::fake()->image('nova-capa.jpg'),
                UploadedFile::fake()->image('nova-extra.jpg'),
            ],
        ]);

        $response->assertRedirect(route('cars.index'));

        $car->refresh();
        $this->assertSame('Atualizado', $car->model);
        $this->assertSame(2021, $car->year);
        $this->assertEquals(15000, (float) $car->price);
        $this->assertTrue($car->is_sold);
        $this->assertCount(1, $car->extra_photos);
        Storage::disk('public')->assertMissing($oldMain);
        Storage::disk('public')->assertMissing($oldExtra);
        Storage::disk('public')->assertExists($car->image);
        Storage::disk('public')->assertExists($car->extra_photos[0]);
    }

    public function test_destroy_removes_main_and_extra_photos_from_storage(): void
    {
        Storage::fake('public');

        $user = $this->actingAsAdmin();
        $brand = Brand::factory()->create();
        $main = UploadedFile::fake()->image('capa.jpg')->store('cars', 'public');
        $extra = UploadedFile::fake()->image('extra.jpg')->store('cars', 'public');

        $car = Car::create([
            'brand_id' => $brand->id,
            'model' => 'Apagar',
            'year' => 2017,
            'price' => 8000,
            'image' => $main,
            'extra_photos' => [$extra],
        ]);

        $response = $this->actingAs($user)->delete("/cars/{$car->id}");

        $response->assertRedirect(route('cars.index'));
        $this->assertSoftDeleted($car);
        Storage::disk('public')->assertMissing($main);
        Storage::disk('public')->assertMissing($extra);
    }

    public function test_olx_style_extra_photos_with_urls_still_work(): void
    {
        $brand = Brand::factory()->create();
        $car = Car::create([
            'brand_id' => $brand->id,
            'model' => 'OLX',
            'year' => 2020,
            'price' => 20000,
            'image' => 'https://example.com/main.jpg',
            'extra_photos' => [
                'https://example.com/extra1.jpg',
                'https://example.com/extra2.jpg',
            ],
            'features' => ['olx_id' => 123],
        ]);

        $this->assertCount(2, $car->extra_photo_urls);
        $this->assertSame('https://example.com/main.jpg', $car->image_url);
        $this->assertSame('https://example.com/extra1.jpg', $car->extra_photo_urls[0]);
        $this->assertSame('https://example.com/extra2.jpg', $car->extra_photo_urls[1]);
    }
}

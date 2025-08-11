<!-- resources/views/contacto.blade.php -->
@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Formulário de Contacto</h1>

    @if(session('success'))
        <div style="color: green;">
            {{ session('success') }}
        </div>
    @endif

    <form action="{{ route('contacto.store') }}" method="POST">
        @csrf
        <label>Nome:</label>
        <input type="text" name="nome" required><br><br>

        <label>Email:</label>
        <input type="email" name="email" required><br><br>

        <label>Mensagem:</label>
        <textarea name="mensagem" required></textarea><br><br>

        <button type="submit">Enviar</button>
    </form>
</div>
@endsection

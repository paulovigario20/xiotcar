<h2>🚗 Nova Pedido de Retoma</h2>

<p><strong>Marca:</strong> {{ $dados['marca'] }}</p>
<p><strong>Modelo:</strong> {{ $dados['modelo'] }}</p>
<p><strong>Ano:</strong> {{ $dados['ano'] }}</p>
<p><strong>Quilómetros:</strong> {{ $dados['km'] }}</p>
<p><strong>Combustível:</strong> {{ $dados['combustivel'] }}</p>
<p><strong>Telefone:</strong> {{ $dados['telefone'] }}</p>

<p><strong>Observações adicionais:</strong> {{ $dados['observacoes'] ?: '—' }}</p>

@if(!empty($dados['fotos']))
<p>As fotografias da viatura foram enviadas em anexo ({{ count($dados['fotos']) }}).</p>
@else
<p><em>Sem fotografias anexadas.</em></p>
@endif
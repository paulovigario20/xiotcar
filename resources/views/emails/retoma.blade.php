<h2>🚗 Nova Pedido de Retoma</h2>

<p><strong>Marca:</strong> {{ $dados['marca'] }}</p>
<p><strong>Modelo:</strong> {{ $dados['modelo'] }}</p>
<p><strong>Ano:</strong> {{ $dados['ano'] }}</p>
<p><strong>KM:</strong> {{ $dados['km'] }}</p>
<p><strong>Combustível:</strong> {{ $dados['combustivel'] }}</p>
<p><strong>Telefone:</strong> {{ $dados['telefone'] }}</p>

@if(!empty($dados['observacoes']))
<p><strong>Observações:</strong> {{ $dados['observacoes'] }}</p>
@endif

<p>As fotos foram enviadas em anexo.</p>
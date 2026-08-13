# Pulso Angola

Portal de notícias responsivo com identidade própria, feed automático de notícias e espaços preparados para Google AdSense.

## 1. Notícias automáticas
O projeto usa GNews no backend para não expor a chave no navegador. Crie uma conta e obtenha uma API key:
https://gnews.io/

Defina a variável de ambiente `GNEWS_API_KEY`.

Nota: o plano gratuito atual é indicado para desenvolvimento/testes e tem limitações; para um portal publicado com notícias em tempo real, confirme o plano e os termos atuais da API.

## 2. Publicar
Recomendado: Vercel.
- Faça upload deste projeto para GitHub.
- Importe o repositório na Vercel.
- Em Settings > Environment Variables, adicione `GNEWS_API_KEY`.
- Faça Deploy.

Também pode adaptar o projeto para Netlify, Render ou outro host que suporte funções serverless.

## 3. Google AdSense
Depois de ter o domínio e conteúdo editorial real:
1. Crie/associe a conta do Google AdSense.
2. Submeta o site para aprovação.
3. Após aprovação, coloque o seu `ca-pub-...` no script do `index.html`.
4. Crie unidades de anúncio e substitua os blocos de publicidade pelos códigos fornecidos pelo AdSense.
5. Configure identidade, impostos e conta bancária dentro do AdSense.

Não há garantia de aprovação ou de rendimento: o valor depende de tráfego, localização dos leitores, inventário publicitário, CTR, RPM e políticas da Google.

## 4. Importante sobre notícias
O feed mostra dados e links de fontes externas. Não copie automaticamente matérias completas de terceiros sem verificar licenças/direitos de republicação. Para construir uma marca editorial forte, publique também matérias próprias, análises, entrevistas e reportagens.

## 5. Domínio
Escolha um domínio disponível e faça-o apontar para a hospedagem. Exemplos de nome: pulsoangola.com, pulsoangola.net ou outra opção disponível.

## 6. Monetização adicional
Além do AdSense, o layout já permite futuramente inserir:
- publicidade direta de empresas angolanas;
- posts patrocinados claramente identificados;
- newsletter patrocinada;
- afiliados, quando adequados.

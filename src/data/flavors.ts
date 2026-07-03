import { Flavor } from '../types';

export const FLAVORS: Flavor[] = [
  {
    id: 'ninho-morango',
    name: 'Ninho com Morango',
    price: 3.00,
    tagline: 'O queridinho da marca: Leite Ninho cremoso com geleia artesanal.',
    description: 'A união perfeita da cremosidade inconfundível do leite em pó premium Ninho com uma geleia de morango 100% natural, cozida lentamente em fogo baixo para preservar os pedaços e o frescor da fruta.',
    ingredients: ['Leite condensado', 'Creme de leite fresco', 'Leite em pó premium Ninho', 'Morangos selecionados', 'Açúcar demerara orgânico'],
    texture: 'Textura aveludada, extremamente cremosa, com o contraste ácido e pedaços doces da calda de morango.',
    color: '#FBFBFB',
    secondaryColor: '#E11D48',
    accentColor: '#C2593F', // Terracota
    isPopular: true,
    imageSeed: 'strawberry-milk',
    category: 'Ninho'
  },
  {
    id: 'leite-condensado-trufado',
    name: 'Leite Condensado Trufado',
    price: 3.00,
    tagline: 'O ápice da doçura: leite condensado com trufa de chocolate belga.',
    description: 'Um dindin suntuoso feito com leite condensado cremoso premium e generosas espirais de ganache de chocolate meio amargo de altíssima qualidade, criando o contraste perfeito entre dulçor e intensidade.',
    ingredients: ['Leite condensado de primeira linha', 'Creme de leite', 'Chocolate meio amargo 54%', 'Cacau em pó belga'],
    texture: 'Denso e sedoso, com veias de chocolate trufado que derretem na boca em tempos diferentes.',
    color: '#FFFDF5',
    secondaryColor: '#3F2212',
    accentColor: '#325289', // Brand Blue
    isPopular: true,
    imageSeed: 'truffle-milk',
    category: 'Especiais'
  },
  {
    id: 'ninho-trufado',
    name: 'Ninho Trufado',
    price: 3.00,
    tagline: 'O clássico absoluto: Leite Ninho com trufa de chocolate.',
    description: 'Nosso sabor assinatura. O autêntico Leite Ninho é transformado em uma base cremosa de congelamento perfeito, recheada com uma trufa de chocolate meio amargo fluida que não endurece completamente.',
    ingredients: ['Leite em pó Ninho', 'Leite condensado', 'Creme de leite', 'Chocolate nobre 50% cacau', 'Fava de baunilha'],
    texture: 'Maciez extrema do leite em pó combinada com a cremosidade líquida da trufa belga.',
    color: '#FAF6ED',
    secondaryColor: '#1E110A',
    accentColor: '#708238', // Olive
    isPopular: true,
    imageSeed: 'ninho-truffle',
    category: 'Ninho'
  },
  {
    id: 'romeu-julieta',
    name: 'Romeu e Julieta',
    price: 3.00,
    tagline: 'A combinação secular brasileira em sua versão mais nobre.',
    description: 'Um creme suave feito com blend de queijos nobres (cream cheese e requeijão artesanal) entrelaçado com uma geleia fluida de goiabada cascão de excelente procedência.',
    ingredients: ['Cream cheese premium', 'Requeijão cremoso', 'Leite integral', 'Goiabada cascão artesanal', 'Pitada de sal marinho'],
    texture: 'Contraste salgado e doce, textura rica de cheesecake gelado com o aveludado da goiabada.',
    color: '#FAF3F3',
    secondaryColor: '#BE123C',
    accentColor: '#C2593F', // Terracota
    imageSeed: 'cheese-guava',
    category: 'Especiais'
  },
  {
    id: 'acai-ninho',
    name: 'Açaí com Ninho',
    price: 3.00,
    tagline: 'Energia pura: Açaí especial com camadas de leite em pó.',
    description: 'Açaí premium selecionado e batido na consistência perfeita, intercalado com generosas colheradas de creme de Leite Ninho puríssimo. Um sabor tropical, refrescante e intensamente energético.',
    ingredients: ['Açaí puro tipo especial', 'Xarope de guaraná artesanal', 'Leite em pó premium Ninho', 'Creme de leite'],
    texture: 'Textura densa e gelada do açaí puro intercalada com a cremosidade macia do creme de Ninho.',
    color: '#3B0764',
    secondaryColor: '#FEF08A',
    accentColor: '#708238', // Olive
    isPopular: false,
    imageSeed: 'acai-powder',
    category: 'Ninho'
  },
  {
    id: 'prestigio',
    name: 'Prestígio',
    price: 3.00,
    tagline: 'Coco ralado fresco envolto em calda trufada de chocolate.',
    description: 'Inspirado no bombom icônico. Creme de coco ralado úmido natural com leite de coco artesanal, finalizado com uma espiral de ganache de chocolate nobre.',
    ingredients: ['Coco ralado fresco desidratado', 'Leite de coco artesanal', 'Leite condensado', 'Ganache de cacau 50%'],
    texture: 'Presença marcante da fibra natural do coco fresco combinada com a cremosidade do chocolate.',
    color: '#FFFFFF',
    secondaryColor: '#451A03',
    accentColor: '#325289', // Brand Blue
    imageSeed: 'coconut-chocolate',
    category: 'Cremosos'
  },
  {
    id: 'mousse-maracuja',
    name: 'Mousse de Maracujá',
    price: 3.00,
    tagline: 'O azedinho refrescante perfeito para os dias de sol.',
    description: 'Mousse aerado feito com polpa concentrada de maracujá silvestre, trazendo aquela acidez brilhante e natural da fruta combinada com a doçura equilibrada do creme.',
    ingredients: ['Polpa natural de maracujá silvestre', 'Leite condensado', 'Creme de leite fresco', 'Sementes de maracujá'],
    texture: 'Sensação leve, aerada e cítrica que derrete instantaneamente na boca com frescor.',
    color: '#FEF08A',
    secondaryColor: '#EAB308',
    accentColor: '#708238', // Olive
    imageSeed: 'passionfruit-mousse',
    category: 'Frutados'
  },
  {
    id: 'mousse-abacaxi',
    name: 'Mousse de Abacaxi',
    price: 3.00,
    tagline: 'Doce tropical: Suavidade do abacaxi com creme artesanal.',
    description: 'Um creme delicado de abacaxi cozido e caramelizado lentamente em calda própria, batido com creme de leite fresco para formar um mousse suave e incrivelmente perfumado.',
    ingredients: ['Abacaxi pérola cozido', 'Açúcar cristal cristalizado', 'Creme de leite', 'Leite condensado'],
    texture: 'Extremamente leve e refrescante com pedacinhos sutis de abacaxi em calda.',
    color: '#FEF9C3',
    secondaryColor: '#FACC15',
    accentColor: '#325289', // Brand Blue
    imageSeed: 'pineapple-mousse',
    category: 'Frutados'
  },
  {
    id: 'coco',
    name: 'Coco',
    price: 3.00,
    tagline: 'O clássico praiano com a máxima intensidade do coco.',
    description: 'Nosso dindin de coco é uma verdadeira ode ao ingrediente. Usamos coco seco ralado na hora e leite de coco espremido artesanalmente para criar um creme sedoso com sabor autêntico.',
    ingredients: ['Coco seco ralado fresco', 'Leite de coco extra virgem', 'Leite condensado', 'Leite integral de fazenda'],
    texture: 'Rico, denso e pedaçudo, repleto de flocos macios de coco natural.',
    color: '#FAFAFA',
    secondaryColor: '#E4E4E7',
    accentColor: '#708238', // Olive
    imageSeed: 'pure-coconut',
    category: 'Cremosos'
  },
  {
    id: 'amendoim-pacoquita',
    name: 'Amendoim com Paçoquita',
    price: 3.00,
    tagline: 'Sabor de festa junina: Creme de amendoim com paçoca crocante.',
    description: 'Creme espesso e reconfortante feito de amendoim torrado de moagem artesanal, misturado com pedaços esfarelados da autêntica paçoquita premium para dar textura e crocância.',
    ingredients: ['Amendoim torrado e moído', 'Paçoquita premium', 'Leite condensado', 'Creme de leite', 'Flor de sal'],
    texture: 'Cremoso, levemente salgado pela flor de sal, com deliciosos pedaços crocantes de paçoca.',
    color: '#FCD34D',
    secondaryColor: '#78350F',
    accentColor: '#C2593F', // Terracota
    imageSeed: 'peanut-butter',
    category: 'Cremosos'
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    price: 3.00,
    tagline: 'Cacau nobre em uma receita que redefine o chocolate gelado.',
    description: 'Esqueça os achocolatados artificiais. Nosso dindin de chocolate é feito com cacau belga 100% puro e pedacinhos de chocolate nobre picado, resultando em um sabor encorpado e reconfortante.',
    ingredients: ['Cacau em pó belga 100%', 'Chocolate meio amargo 54% picado', 'Leite condensado', 'Creme de leite fresco'],
    texture: 'Aveludado e denso, como um gelato de chocolate italiano premium.',
    color: '#451A03',
    secondaryColor: '#78350F',
    accentColor: '#C2593F', // Terracota
    imageSeed: 'chocolate-ganache',
    category: 'Cremosos'
  },
  {
    id: 'castanha',
    name: 'Castanha',
    price: 3.00,
    tagline: 'A riqueza e sofisticação da Castanha-de-Caju regional.',
    description: 'Um sabor nobre que homenageia a riqueza brasileira. Feito com castanhas-de-caju premium, tostadas artesanalmente e processadas até virar uma pasta finíssima, incorporada a um creme aveludado.',
    ingredients: ['Castanhas-de-caju selecionadas e torradas', 'Leite condensado', 'Creme de leite', 'Leite integral'],
    texture: 'Textura untuosa, rica e amanteigada, com micro-pedacinhos crocantes de castanha.',
    color: '#F5EBE6',
    secondaryColor: '#B45309',
    accentColor: '#325289', // Brand Blue
    imageSeed: 'cashew-nut',
    category: 'Especiais'
  },
  {
    id: 'morango',
    name: 'Morango',
    price: 3.00,
    tagline: 'Sabor fresco e vibrante de morango fresco em calda.',
    description: 'Creme suave de baunilha e creme de leite fresco repleto de morangos cozidos em calda brilhante. Um clássico frutado, refrescante e de cor intensamente apaixonante.',
    ingredients: ['Morangos silvestres', 'Leite integral', 'Creme de leite', 'Leite condensado', 'Açúcar demerara'],
    texture: 'Muito fresco, levemente cremoso e com a textura natural das sementes e polpa do morango.',
    color: '#FFE4E6',
    secondaryColor: '#E11D48',
    accentColor: '#C2593F', // Terracota
    imageSeed: 'fresh-strawberry',
    category: 'Frutados'
  }
];

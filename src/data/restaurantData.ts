export interface Product {
  id: string;
  category: 'specialty_coffee' | 'espresso_latte' | 'chai_karak' | 'bakery_sweets' | 'breakfast_brunch' | 'retail_beans';
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  price: number; // in AED
  image: string;
  badge?: string;
  origin?: string;
  process?: string;
  calories?: number;
  prepTime?: string;
  isCustomizable?: boolean;
}

export interface UAEBranch {
  id: string;
  nameAr: string;
  nameEn: string;
  city: string;
  addressAr: string;
  addressEn: string;
  timingAr: string;
  phone: string;
  whatsapp: string;
  googleMapsUrl: string;
  features: string[];
}

export interface Review {
  id: string;
  authorAr: string;
  authorEn: string;
  city: string;
  rating: number;
  date: string;
  commentAr: string;
  commentEn: string;
  favoriteItem: string;
}

export const RESTAURANT_INFO = {
  brandName: 'ROAST × CHAI',
  subNameAr: 'مطعم ومحمصة القهوة المختصة دبي',
  subNameEn: 'Specialty Coffee & Roastery Dubai',
  establishedYear: 2018,
  officialPhone: '+971 50 645 7762',
  whatsappNumber: '971506457762',
  email: 'orders@roastdubai.com',
  rating: 4.8,
  reviewsCount: 3840,
  freeDeliveryThreshold: 100,
  deliveryFee: 12,
  avgDeliveryTime: '25 - 35 دقيقة',
};

export const MENU_CATEGORIES = [
  { id: 'all', nameAr: 'كل القائمة', nameEn: 'All Menu' },
  { id: 'specialty_coffee', nameAr: 'القهوة المقطرة V60', nameEn: 'Specialty Filter' },
  { id: 'espresso_latte', nameAr: 'إسبريسو ولاتيه', nameEn: 'Espresso & Lattes' },
  { id: 'chai_karak', nameAr: 'شاي كرك ومشروبات خاصة', nameEn: 'Chai & Signatures' },
  { id: 'bakery_sweets', nameAr: 'الحلويات والمخبوزات', nameEn: 'Pastries & Desserts' },
  { id: 'breakfast_brunch', nameAr: 'وجبات الفطور والبرانش', nameEn: 'Brunch & Dining' },
  { id: 'retail_beans', nameAr: 'محاصيل البن للبيت', nameEn: 'Whole Bean Bags' },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'v60-geisha-panama',
    category: 'specialty_coffee',
    nameAr: 'V60 قيشا بنما الحصري (Panama Geisha)',
    nameEn: 'V60 Panama Geisha Reserve',
    descAr: 'المحصول الفاخر الأعلى تصنيفاً عالمياً. استخلاص يدوي متقن بإيحاءات الياسمين وزهر البرتقال وحلاوة البابايا والخوخ الأبيض.',
    descEn: 'Handcrafted single origin pour over with delicate floral jasmine notes, white peach, and lingering bergamot sweetness.',
    price: 38,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
    badge: 'الأعلى طلباً ⭐',
    origin: 'بنما - بوكيتي (Boquete, Panama)',
    process: 'معالجة طبيعية مغسولة',
    prepTime: '6 دقائق',
    calories: 5,
    isCustomizable: true,
  },
  {
    id: 'spanish-latte-signature',
    category: 'espresso_latte',
    nameAr: 'سبانش لاتيه بارد ومميز (Iced Spanish)',
    nameEn: 'Signature Iced Spanish Latte',
    descAr: 'مزيج فاخر متوازن بين شوت إسبريسو مزدوج محمّص محلياً في دبي مع خلطة حليب مكثف ومبخر بارد بقوام حريري.',
    descEn: 'Local Dubai favorite. Double espresso ristretto layered over velvety condensed milk and fresh chilled whole milk.',
    price: 28,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=700&q=80',
    badge: 'الأكثر مبيعاً 🔥',
    origin: 'محصول كولومبيا هويلا',
    prepTime: '3 دقائق',
    calories: 185,
    isCustomizable: true,
  },
  {
    id: 'flat-white-colombia',
    category: 'espresso_latte',
    nameAr: 'فلات وايت - كولومبيا سوبريمو',
    nameEn: 'Artisan Flat White Colombia',
    descAr: 'دبل ريستريتو غني مع حليب دقيق التبخير برغوة مخملية رقيقة ونوتات الكاكاو والبندق والكراميل المتوازن.',
    descEn: 'Double ristretto with micro-foamed silky milk, highlighting notes of roasted cacao, toasted hazelnut, and brown sugar.',
    price: 24,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80',
    origin: 'كولومبيا هويلا',
    prepTime: '4 دقائق',
    calories: 120,
    isCustomizable: true,
  },
  {
    id: 'chemex-ethiopia-yirgacheffe',
    category: 'specialty_coffee',
    nameAr: 'كيمكس إثيوبيا يرقاتشيفي (Ethiopia Chemex)',
    nameEn: 'Chemex Ethiopia Yirgacheffe',
    descAr: 'استخلاص كيمكس كلاسيكي نقي وفائق الصفاوة مع إيحاءات التوت البري والحمضيات وعسل الزهور البرية.',
    descEn: 'Ultra-clean extraction yielding bright blueberry clarity, black tea finish, and wild honey nuance.',
    price: 34,
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=700&q=80',
    badge: 'توصية الباريستا 🏆',
    origin: 'إثيوبيا - يرقاتشيفي',
    process: 'مجففة لا هوائية',
    prepTime: '7 دقائق',
    calories: 5,
    isCustomizable: true,
  },
  {
    id: 'pistachio-basque-cheesecake',
    category: 'bakery_sweets',
    nameAr: 'تشيز كيك الفستق الباسكي الطازج',
    nameEn: 'Dubai Pistachio Basque Cheesecake',
    descAr: 'تشيز كيك سان سيباستيان المخبوز على الطريقة الباسكية بقلب ذائب، مع صوص الفستق الحلبي الطبيعي 100% وحبات الفستق المحمص.',
    descEn: 'Caramelized Basque cheesecake with a luscious molten center, drowned in pure roasted Sicilian & Iranian pistachio sauce.',
    price: 34,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80',
    badge: 'طازج يومياً ✨',
    prepTime: 'جاهز للتقديم',
    calories: 380,
    isCustomizable: false,
  },
  {
    id: 'roast-royal-karak',
    category: 'chai_karak',
    nameAr: 'كرك ملكي بالزعفران العضوي والهيل',
    nameEn: 'Royal Saffron & Cardamom Karak',
    descAr: 'شاي سيلاني فاخر مطبوخ على نار هادئة مع حليب مبخر كامل، وخيوط الزعفران النقي وهيل أخضر منتقى بعناية.',
    descEn: 'Slow-simmered Ceylon black tea with rich condensed cream, aromatic emerald cardamom pods, and organic saffron threads.',
    price: 18,
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=700&q=80',
    badge: 'تراث إماراتي عريق',
    origin: 'سيلان وزعفران إيراني سوبر نغين',
    prepTime: '4 دقائق',
    calories: 140,
    isCustomizable: true,
  },
  {
    id: 'avocado-sourdough-tartine',
    category: 'breakfast_brunch',
    nameAr: 'توست الأفوكادو والخبز المخمر (Sourdough)',
    nameEn: 'Truffle Avocado Sourdough Tartine',
    descAr: 'شريحة خبز ساوردو محمص طبيعياً، بيوريه أفوكادو هاس طازج، جبنة فيتا عضوية، بذور القرع، ورشة زيت زيتون بكر وزيت الكمأة.',
    descEn: 'Artisan sourdough slice, crushed Hass avocado, Danish feta, microgreens, toasted pumpkin seeds, and white truffle oil drizzle.',
    price: 39,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',
    badge: 'خيار صحي 🥑',
    prepTime: '8 دقائق',
    calories: 320,
    isCustomizable: true,
  },
  {
    id: 'halloumi-pesto-panini',
    category: 'breakfast_brunch',
    nameAr: 'بانيني الحلوم المشوي وصوص البيستو',
    nameEn: 'Grilled Cypriot Halloumi Panini',
    descAr: 'خبز تشاباتا مقرمش، شرائح جبن حلوم قبرصي مشوي، طماطم مجففة بالشمس، ريحان طازج وصوص بيستو محضر يومياً.',
    descEn: 'Toasted rustic ciabatta, grilled halloumi cheese, sun-dried heirloom tomatoes, fresh arugula, and house pesto.',
    price: 36,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=700&q=80',
    prepTime: '7 دقائق',
    calories: 410,
    isCustomizable: true,
  },
  {
    id: 'dates-pudding-salted-caramel',
    category: 'bakery_sweets',
    nameAr: 'بودينغ تمر خلاص دبي بالكراميل المملح',
    nameEn: 'Warm Dubai Khalas Date Pudding',
    descAr: 'كعكة تمر الخلاص الإماراتي الدافئة، مغطاة بصوص كراميل الزبدة المملح ومقدمة مع آيس كريم فانيليا مدغشقر الفاخرة.',
    descEn: 'Warm Emirates Khalas date sponge drenched in rich warm salted toffee sauce with a scoop of Madagascar vanilla bean gelato.',
    price: 32,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
    badge: 'حلوى الموسم 🍯',
    prepTime: '5 دقائق',
    calories: 450,
    isCustomizable: false,
  },
  {
    id: 'retail-panama-geisha-250g',
    category: 'retail_beans',
    nameAr: 'محصول قيشا بنما - حبوب بن كاملة (250غ)',
    nameEn: 'Panama Geisha Whole Bean Box (250g)',
    descAr: 'صندوق حبوب القهوة الفاخرة محمصة حديثاً بمركز إنتاجنا في مجمع دبي للعلوم، جاهزة للتحضير المنزلي أو الطحن حسب رغبتك.',
    descEn: 'Freshly roasted whole beans in Dubai Science Park roastery, nitro-sealed with one-way degassing valve. Cup score: 91.5.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=700&q=80',
    badge: 'محمصة دبي الرسمية ☕',
    origin: 'بنما - جبل بارو',
    prepTime: 'شحن فوري اليوم',
    isCustomizable: true,
  },
  {
    id: 'retail-dubai-blend-250g',
    category: 'retail_beans',
    nameAr: 'خلطة دبي الخاصة للإسبريسو (250غ)',
    nameEn: 'Dubai Signature Espresso Blend (250g)',
    descAr: 'مزيجنا الخاص المعتمد في جميع فروعنا. قوام ثقيل ومخملي مع إيحاءات الشوكولاتة الداكنة والمكسرات المحمصة وحلاوة القصب.',
    descEn: 'Our house flagship espresso blend served in all ROAST branches. Dense crema, chocolate fudge, and roasted almond finish.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=700&q=80',
    origin: 'كولومبيا والبرازيل وإثيوبيا',
    isCustomizable: true,
  },
  {
    id: 'croissant-almond-butter',
    category: 'bakery_sweets',
    nameAr: 'كرواسون الزبدة الفرنسي برقائق اللوز',
    nameEn: 'Double-Baked French Almond Croissant',
    descAr: 'كرواسون زبدة مقرمش مورق ومخبوز مرتين بحشوة كريمة اللوز الفرانسيبان ورقائق اللوز المحمص وسكر مثلج.',
    descEn: 'Golden twice-baked croissant stuffed with rich frangipane almond cream, toasted sliced almonds, and powdered sugar dusting.',
    price: 22,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80',
    badge: 'مخبوز طازج',
    prepTime: 'جاهز',
    calories: 340,
    isCustomizable: false,
  }
];

export const UAE_BRANCHES: UAEBranch[] = [
  {
    id: 'branch-dsp',
    nameAr: 'مجمع دبي للعلوم (المقر والمحمصة الرئيسية)',
    nameEn: 'Dubai Science Park (Roastery & Flagship)',
    city: 'دبي - مجمع دبي للعلوم',
    addressAr: 'مجمع دبي للعلوم، بناية المختبرات الجنوبية، البرشاء جنوب',
    addressEn: 'DSP South Towers, Al Barsha South, Dubai',
    timingAr: 'يومياً: 6:30 صباحاً – 11:30 مساءً',
    phone: '+971 50 645 7762',
    whatsapp: '971506457762',
    googleMapsUrl: 'https://maps.google.com/?q=Dubai+Science+Park',
    features: ['مركز التحميص الحي', 'مواقف مجانية', 'جلسات خارجية', 'واي فاي فائق السرعة', 'ورش تذوق القهوة (Cupping)'],
  },
  {
    id: 'branch-downtown',
    nameAr: 'وسط مدينة دبي (Downtown Dubai)',
    nameEn: 'Downtown Dubai - Burj Khalifa Blvd',
    city: 'دبي - بوليفارد محمد بن راشد',
    addressAr: 'بوليفارد الشيخ محمد بن راشد، مقابل برج خليفة ودبي أوبرا',
    addressEn: 'Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
    timingAr: 'يومياً: 7:00 صباحاً – 1:00 بعد منتصف الليل',
    phone: '+971 4 398 2211',
    whatsapp: '971506457762',
    googleMapsUrl: 'https://maps.google.com/?q=Downtown+Dubai+Boulevard',
    features: ['إطلالة برج خليفة', 'تراس مكيف بالرذاذ', 'خدمة صف السيارات (Valet)', 'مشروبات حصرية'],
  },
  {
    id: 'branch-marina',
    nameAr: 'دبي مارينا (Dubai Marina Walk)',
    nameEn: 'Dubai Marina Walk',
    city: 'دبي - الممشى السياحي',
    addressAr: 'ممشى دبي مارينا، مارينا بروميناد بالقرب من برج مارينا هايتس',
    addressEn: 'Marina Promenade Walk, Dubai Marina',
    timingAr: 'يومياً: 7:00 صباحاً – 12:00 منتصف الليل',
    phone: '+971 4 447 9901',
    whatsapp: '971506457762',
    googleMapsUrl: 'https://maps.google.com/?q=Dubai+Marina+Walk',
    features: ['إطلالة القوارب واليخوت', 'صديق للحيوانات الأليفة في التراس', 'جلسات عمل مريحة'],
  },
  {
    id: 'branch-barsha',
    nameAr: 'فرع البرشاء 1 (Al Barsha 1)',
    nameEn: 'Al Barsha 1 - Dubai',
    city: 'دبي - حي البرشاء',
    addressAr: 'شارع البرشاء 1، بالقرب من مول الإمارات ومحطة المترو',
    addressEn: 'Al Barsha 1, near Mall of the Emirates, Dubai',
    timingAr: 'يومياً: 6:30 صباحاً – 12:00 منتصف الليل',
    phone: '+971 4 323 8844',
    whatsapp: '971506457762',
    googleMapsUrl: 'https://maps.google.com/?q=Al+Barsha+1+Dubai',
    features: ['طلب بالسيارة سريع', 'مساحة عمل للطلاب والموظفين', 'بار تحضير يدوي'],
  },
  {
    id: 'branch-deira',
    nameAr: 'فرع ديرة التاريخي (Deira Dubai)',
    nameEn: 'Deira - Clock Tower',
    city: 'دبي - ديرة',
    addressAr: 'شارع آل مكتوم، بالقرب من دوار الساعة ودوار السمكة، ديرة',
    addressEn: 'Al Maktoum Rd, Near Clock Tower, Deira, Dubai',
    timingAr: 'يومياً: 6:00 صباحاً – 1:00 بعد منتصف الليل',
    phone: '+971 4 228 1190',
    whatsapp: '971506457762',
    googleMapsUrl: 'https://maps.google.com/?q=Deira+Clock+Tower+Dubai',
    features: ['أصالة وضيافة إماراتية', 'جلسات عائلية مريحة', 'شاي كرك مميز طازج دائماً'],
  },
  {
    id: 'branch-abudhabi',
    nameAr: 'فرع أبوظبي - شارع المطار والكورنيش',
    nameEn: 'Abu Dhabi - Airport Road',
    city: 'أبوظبي - شارع المطار',
    addressAr: 'شارع المطار القديم (شارع الشيخ راشد بن سعيد)، أبوظبي',
    addressEn: 'Sheikh Rashid Bin Saeed St (Airport Rd), Abu Dhabi',
    timingAr: 'يومياً: 7:00 صباحاً – 11:30 مساءً',
    phone: '+971 2 633 4455',
    whatsapp: '971506457762',
    googleMapsUrl: 'https://maps.google.com/?q=Abu+Dhabi+Airport+Road',
    features: ['خدمة التوصيل السريع لأبوظبي', 'تصميم معماري فاخر', 'مجلس قهوة مختصة'],
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorAr: 'سلطان القاسمي',
    authorEn: 'Sultan Al Qasimi',
    city: 'دبي - داون تاون',
    rating: 5,
    date: 'منذ يومين',
    commentAr: 'أفضل V60 قيشا في دبي بدون منازع! تحميصهم في مجمع دبي للعلوم يعطي طعم نقي جداً، والطلب المباشر من موقعهم أسرع بكثير من تطبيقات التوصيل وبدون زيادة في السعر.',
    commentEn: 'Hands down the best V60 Geisha in Dubai. Fast direct delivery right to Downtown with zero app markups.',
    favoriteItem: 'V60 قيشا بنما الحصري',
  },
  {
    id: 'rev-2',
    authorAr: 'فاطمة المري',
    authorEn: 'Fatima Al Marri',
    city: 'دبي - البرشاء',
    rating: 5,
    date: 'منذ 4 أيام',
    commentAr: 'السبانش لاتيه البارد وتشيز كيك الفستق إدمان يومي. التغليف فخم ويوصل القهوة مثلجة ومضبوطة. فخورة بوجود محمصة محلية بهذا المستوى الرفيع.',
    commentEn: 'Their Iced Spanish Latte and Basque pistachio cheesecake are second to none. Exceptional packaging and quality.',
    favoriteItem: 'سبانش لاتيه بارد ومميز',
  },
  {
    id: 'rev-3',
    authorAr: 'راشد المنصوري',
    authorEn: 'Rashid Al Mansoori',
    city: 'أبوظبي',
    rating: 5,
    date: 'منذ أسبوع',
    commentAr: 'شاي الكرك الملكي بالزعفران يجمع بين الطعم التراثي الأصيل وفخامة القهوة المختصة. خدمة الواتساب سريعة ومحترفة جداً.',
    commentEn: 'The Royal Saffron Karak takes classic Emirati hospitality to an artisan specialty level. Highly recommended!',
    favoriteItem: 'كرك ملكي بالزعفران',
  },
];

export const UAE_EMIRATES = [
  'دبي (Dubai)',
  'أبوظبي (Abu Dhabi)',
  'الشارقة (Sharjah)',
  'عجمان (Ajman)',
  'رأس الخيمة (Ras Al Khaimah)',
  'أم القيوين (Umm Al Quwain)',
  'الفجيرة (Fujairah)',
  'العين (Al Ain)',
];

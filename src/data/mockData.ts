import { CompanyInfo, HeroSlide, Project, Service, Testimonial } from "@/types";

export const companyInfo: CompanyInfo = {
  name: "Organizasyon",
  tagline: "Siz Hayal Edin, Biz Gerçekleştirelim!",
  description: "Reel Organizasyon; düğün, nişan, kurumsal etkinlikler, mezuniyet törenleri ve özel günler için yaratıcı, profesyonel ve eksiksiz organizasyon hizmeti sunar.",
  contact: {
    phone: "0555 555 5555",
    email: "info@organizasyon.com",
    address: "İstanbul, Türkiye",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      youtube: "https://youtube.com",
    },
  },
};

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    headline: "Siz Hayal Edin, Biz Gerçekleştirelim!",
    subheadline: "Profesyonel ekibimizle en özel günlerinizde yanınızdayız.",
    image: "https://picsum.photos/1920/1080?random=1", 
    ctaText: "TEKLİF ALIN",
    ctaLink: "/iletisim",
  },
  {
    id: "2",
    headline: "Kurumsal Etkinliklerde Çözüm Ortağınız",
    subheadline: "Markanızın gücüne güç katan organizasyonlar.",
    image: "https://picsum.photos/1920/1080?random=2",
    ctaText: "İLETİŞİME GEÇİN",
    ctaLink: "/iletisim",
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "Düğün Organizasyonu",
    slug: "dugun-organizasyonu",
    shortDescription: "Hayallerinizdeki düğünü gerçeğe dönüştürüyoruz. Mekan süslemesinden müzik seçimine kadar her detayla ilgileniyoruz.",
    mainImage: "https://picsum.photos/800/600?random=3",
    content: `
      <h1>Düğün Organizasyonu</h1>
      <p>Hayatınızın en önemli günlerinden biri olan düğün gününüzde, her detayın mükemmel olması için çalışıyoruz.</p>
      <h2>Hizmetlerimiz</h2>
      <ul>
        <li>Mekan Danışmanlığı ve Süsleme</li>
        <li>Profesyonel Ses ve Işık Sistemleri</li>
        <li>Catering ve İkram Hizmetleri</li>
        <li>Fotoğraf ve Video Çekimi</li>
        <li>Düğün Pastası ve Tatlı Büfesi</li>
      </ul>
      <p>Reel Organizasyon olarak, çiftlerimizin isteklerini dinliyor ve onlara özel konseptler hazırlıyoruz.</p>
    `,
  },
  {
    id: "2",
    title: "Kurumsal Etkinlikler",
    slug: "kurumsal-etkinlikler",
    shortDescription: "Şirket yemekleri, lansmanlar, toplantılar ve bayi etkinlikleri için profesyonel çözümler.",
    mainImage: "https://picsum.photos/800/600?random=4",
    content: `
      <h1>Kurumsal Etkinlikler</h1>
      <p>Şirketinizin prestijini yansıtacak, kusursuz kurumsal organizasyonlar düzenliyoruz.</p>
      <h2>Neler Yapıyoruz?</h2>
      <p>Bayi toplantılarından ürün lansmanlarına, şirket içi motivasyon etkinliklerinden yılbaşı partilerine kadar geniş bir yelpazede hizmet vermekteyiz.</p>
    `,
  },
  {
    id: "3",
    title: "Nişan Organizasyonu",
    slug: "nisan-organizasyonu",
    shortDescription: "Evliliğe atılan ilk adımda yanınızdayız. Size özel nişan konseptleri hazırlıyoruz.",
    mainImage: "https://picsum.photos/800/600?random=5",
    content: `
      <h1>Nişan Organizasyonu</h1>
      <p>Evliliğe giden yolda atılan bu ilk adımda, size ve sevdiklerinize unutulmaz bir nişan töreni hazırlıyoruz.</p>
    `,
  },
  {
    id: "4",
    title: "Mezuniyet Törenleri",
    slug: "mezuniyet-torenleri",
    shortDescription: "Öğrencilerin bu mutlu gününde, kep atma töreninden eğlenceye kadar her şeyi planlıyoruz.",
    mainImage: "https://picsum.photos/800/600?random=6",
    content: `
      <h1>Mezuniyet Törenleri</h1>
      <p>Okul yıllarının yorgunluğunu atmak ve yeni bir hayata adım atmak için düzenlenen mezuniyet törenlerini şölene dönüştürüyoruz.</p>
    `,
  },
  {
    id: "5",
    title: "Açılış Organizasyonları",
    slug: "acilis-organizasyonlari",
    shortDescription: "İş yerinizin açılışında ses getirecek, dikkat çekici organizasyonlar.",
    mainImage: "https://picsum.photos/800/600?random=7",
    content: `
      <h1>Açılış Organizasyonları</h1>
      <p>Yeni işletmenizin açılışını görkemli bir şekilde yaparak, müşterilerinizin ilgisini çekmenizi sağlıyoruz.</p>
    `,
  },
  {
    id: "6",
    title: "Doğum Günü Partileri",
    slug: "dogum-gunu-partileri",
    shortDescription: "Hem çocuklar hem de yetişkinler için konsept doğum günü partileri.",
    mainImage: "https://picsum.photos/800/600?random=8",
    content: `
      <h1>Doğum Günü Partileri</h1>
      <p>Sevdiklerinizin yeni yaşını en güzel şekilde kutlamaları için harika doğum günü konseptleri hazırlıyoruz.</p>
    `,
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Büyükada Kır Düğünü",
    slug: "buyukada-kir-dugunu",
    category: "Düğün",
    coverImage: "https://picsum.photos/800/600?random=9",
    images: [
      "https://picsum.photos/800/600?random=10",
      "https://picsum.photos/800/600?random=11",
    ],
    description: "Doğa ile iç içe, rüya gibi bir kır düğünü organizasyonu gerçekleştirdik.",
    date: "2023-09-15",
    location: "İstanbul, Büyükada",
  },
  {
    id: "2",
    title: "Teknoloji Zirvesi 2023",
    slug: "teknoloji-zirvesi-2023",
    category: "Kurumsal",
    coverImage: "https://picsum.photos/800/600?random=12",
    images: [
      "https://picsum.photos/800/600?random=13",
      "https://picsum.photos/800/600?random=14",
    ],
    description: "Sektörün önde gelen isimlerini bir araya getirdiğimiz teknoloji zirvesi.",
    date: "2023-11-20",
    location: "İstanbul, Kongre Merkezi",
  },
  {
    id: "3",
    title: "Boğazda Nişan Töreni",
    slug: "bogazda-nisan-toreni",
    category: "Nişan",
    coverImage: "https://picsum.photos/800/600?random=15",
    images: [
      "https://picsum.photos/800/600?random=16",
    ],
    description: "İstanbul Boğazı manzaralı, nezih bir nişan töreni.",
    date: "2023-08-05",
    location: "İstanbul, Sarıyer",
  },
];

export const navItems = [
  { label: "Kurumsal", href: "/hakkimizda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Projeler", href: "/projeler" },
  { label: "İletişim", href: "/iletisim" },
];

import "./BannerHero.css";
import { Link } from 'react-router-dom'

export default function BannerHero({scrollToContainer}) {
  return (
    <>
      <div className="Banner_HeroSection">
        <div className="Content">
          <div className="Title">Rumah dari makanan terbaik</div>
          <div className="Description">
            Multi-brand virtual restoran pertama di Indonesia yang berfokus pada
            layanan pesan antar. Produk kami telah dinikmati puluhan juta orang
            dengan total ribuan pesanan setiap harinya
          </div>
          <div className="Container">
            <button className="button-background" onClick={scrollToContainer}>Lihat Menu</button>
            <Link to='/about'>
            <button className="button-border">Tentang Kami</button>
            </Link>
          </div>
        </div>
        <div className="HeroImage">
          <img src="https://res.cloudinary.com/dszhu92hc/image/upload/v1717910850/uf3uirirbq7pcjdalqop.png" />
        </div>
      </div>
    </>
  );
}

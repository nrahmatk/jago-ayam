import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="Banner_HeroSection">
        <div className="HeroImage">
          <img src="https://res.cloudinary.com/dszhu92hc/image/upload/v1717910850/uf3uirirbq7pcjdalqop.png" />
        </div>
        <div className="Content">
          <div className="Title">Selamat datang</div>
          <div className="Description">
            <p>
              Website ini dibuat sebagai bagian dari tugas pendidikan untuk mata
              pelajaran Fullstack JavaScript.
            </p>

            <h3>Tujuan Kami</h3>
            <ul>
              <li>
                <strong>Pembelajaran</strong>: Mengembangkan keterampilan kami
                dalam pemrograman dan pengembangan web.
              </li>
              <li>
                <strong>Eksperimen</strong>: Mencoba berbagai teknik dan alat
                yang digunakan dalam pengembangan Fullstack JavaScript.
              </li>
              <li>
                <strong>Proyek Pendidikan</strong>: Menyelesaikan tugas yang
                diberikan dalam program pendidikan kami.
              </li>
            </ul>

            <h3>Peringatan</h3>
            <p>
              Kami ingin meminta maaf jika ada kesamaan nama produk, gambar,
              atau konten lain yang mungkin muncul di website ini. Semua konten
              yang digunakan di sini semata-mata untuk tujuan pendidikan dan
              bukan untuk penggunaan komersial. Jika ada masalah atau
              kekhawatiran mengenai konten yang digunakan, jangan ragu untuk
              menghubungi kami.
            </p>

            <p>
              Terima kasih telah mengunjungi website kami dan mendukung proses
              pembelajaran kami!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

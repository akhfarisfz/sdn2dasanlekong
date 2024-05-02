import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10 w-screen">
      <div className="container mx-6 px-4">
        {/* Alamat Sekolah */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Alamat Sekolah</h3>
          <p>
            Jl.Raden Patik Wadira - Dasan Lekong, Dasan Lekong, Kec. Sukamulia
          </p>
          <p>Lombok Timur, Nusa Tenggara Barat</p>
        </div>
        {/* Peta Lokasi */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Lokasi Sekolah</h3>
          <div className="aspect-w-16 aspect-h-9">
            {/* Embedded Google Maps */}
            <iframe
              className="w-52 sm:w-1/3 md:w-1/4 lg:w-1/5 h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.559290796563!2d116.4918852!3d-8.6382364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcc4bcfa28eb9e3%3A0xee89e3bde0587194!2sSDN%202%20DASAN%20LEKONG!5e0!3m2!1sid!2sid!4v1714476926486!5m2!1sid!2sid"
              title="Google Maps"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* Hak Cipta */}
        <div className="text-center">
          <p>&copy; 2024 Sekolah. Hak Cipta Dilindungi Undang-Undang</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

const slider = document.querySelector(".slider");
const list = document.querySelector(".list");
const items = list.querySelectorAll(".item");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

let currentIndex = 0;

// Fungsi untuk mengupdate item yang aktif
const updateActiveItem = () => {
  items.forEach((item, index) => {
    item.classList.remove("active");
    item.style.display = "none"; // Sembunyikan semua item dulu
  });

  items[currentIndex].style.display = "block"; // Tampilkan item aktif
  setTimeout(() => {
    items[currentIndex].classList.add("active"); // Tambahkan class aktif setelah tampilan berubah
  }, 10); // Delay sedikit agar tidak ada flicker
};

// Set item pertama sebagai aktif saat halaman dimuat
updateActiveItem();

next.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % items.length; // Ubah indeks dulu
  updateActiveItem(); // Lalu update tampilan
  slider.classList.add("next");
  setTimeout(() => {
    slider.classList.remove("next");
  }, 500);
});

prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length; // Ubah indeks dulu
  updateActiveItem(); // Lalu update tampilan
  slider.classList.add("prev");
  setTimeout(() => {
    slider.classList.remove("prev");
  }, 500);
});

const coklatList = [
  {
    src: "Gambar/Coklat Kacang.png",
    typ: "Nut Chocolate",
    msg: "Strong and dependable, you have a tough exterior but a heart full of warmth and kindness. Always ready to support everyone you love.",
  },
  {
    src: "Gambar/Coklat Keju.png",
    typ: "Cheese Chocolate",
    msg: "Unconventional and intriguing, you bring a unique flavor to life. A mix of boldness and charm.",
  },
  {
    src: "Gambar/Coklat Marshmellow.png",
    typ: "Marshmellow Chocolate",
    msg: "Soft-hearted and sweet, you radiate warmth and comfort. A dreamer at heart, you make life feel like a cozy embrace.",
  },
  {
    src: "Gambar/Coklat Putih.png",
    typ: "White Chocolate",
    msg: "Elegant and graceful, you have a gentle soul with a quiet confidence. your presence is soothing, yet you leave a lasting impression.",
  },
  {
    src: "Gambar/Coklat Strawberry.png",
    typ: "Strawberry Chocolate",
    msg: "Playful and full of energy, you bring joy wherever you go. With a heart as bright as their smile, you make life a little sweeter.",
  },
];

let namaPengguna = "";

function mulaiGacha() {
  namaPengguna = document.getElementById("nama").value;
  if (namaPengguna.trim() === "") {
    // Tampilkan modal alert jika input kosong
    document.getElementById("alertModal").style.display = "flex";
    return;
  }
  // Sembunyikan div .nama
  document.querySelector(".nama").style.display = "none";
  // Tampilkan div .gacha
  document.querySelector(".gacha").style.display = "block";
  document.getElementById(
    "greeting"
  ).innerText = `Hello, ${namaPengguna}! Let's Get Your Chocolate !`;
  document.getElementById("gacha").style.display = "block";
}

function tutupAlert() {
  document.getElementById("alertModal").style.display = "none";
}

function gachaCoklat() {
  let hasil = coklatList[Math.floor(Math.random() * coklatList.length)];

  // Memasukkan hasil gacha ke dalam modal
  document.getElementById("dear").innerText = `Dear, ${namaPengguna}`;
  document.getElementById("coklatGacha").src = hasil.src;
  document.getElementById("chocolateType").innerText = hasil.typ;
  document.getElementById("message").innerText = hasil.msg;
  // Menampilkan modal dan memberi efek blur pada background
  document.getElementById("popup").style.display = "flex";
  document.querySelector(".gacha").classList.add("blur");
}

// Fungsi Menutup Modal
function tutupModal() {
  document.getElementById("popup").style.display = "none";
  document.querySelector(".gacha").classList.remove("blur");
}

// Fungsi Simpan Gambar
function simpanGambar() {
  let resultSection = document.getElementById("hasilGacha");
  let closeButton = document.querySelector(
    ".modal-content button:nth-child(6)"
  ); // Tombol Close
  let saveButton = document.querySelector(".modal-content button:nth-child(7)"); // Tombol Save

  // Sembunyikan tombol sebelum screenshot
  closeButton.style.display = "none";
  saveButton.style.display = "none";

  html2canvas(resultSection).then((canvas) => {
    let link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `HasilGacha_${namaPengguna}.png`;
    link.click();

    // Tampilkan kembali tombol setelah screenshot selesai
    closeButton.style.display = "inline-block";
    saveButton.style.display = "inline-block";

    // Tutup modal utama & hapus blur setelah 500ms
    setTimeout(() => {
      document.getElementById("popup").style.display = "none";
      document.querySelector(".gacha").classList.remove("blur");

      // Setelah modal utama hilang, tampilkan modal notifikasi
      setTimeout(() => {
        document.getElementById("notifModal").style.display = "flex";
      }, 300); // Delay agar transisi lebih mulus
    }, 500);
  });
}

// Fungsi Menutup Modal Notifikasi
function tutupNotif() {
  document.getElementById("notifModal").style.display = "none";
  document.querySelector(".gacha").classList.remove("blur");
}

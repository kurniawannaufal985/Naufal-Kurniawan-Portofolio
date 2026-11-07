// JavaScript portfolio disusun dengan pola dasar Materi 12.
// Fitur tambahan hanya dipakai untuk mempertahankan animasi dan Particle.js.

// 1. Menu navigasi HP.
function toggleMenu() {
    var daftarMenu = document.getElementById('navLinks');
    if (daftarMenu) {
        if (daftarMenu.className === 'nav-links') {
            daftarMenu.className = 'nav-links active';
        } else {
            daftarMenu.className = 'nav-links';
        }
    }
}

function tutupMenu() {
    var daftarMenu = document.getElementById('navLinks');
    if (daftarMenu) {
        daftarMenu.className = 'nav-links';
    }
}

// 2. Animasi nama yang sedang diketik.
var nama = 'Naufal Kurniawan';
var posisiHuruf = 0;
var sedangMenghapus = false;
var teksNama = document.getElementById('typingText');

function ketikNama() {
    if (!teksNama) {
        return;
    }

    teksNama.innerHTML = nama.substring(0, posisiHuruf);
    var kecepatan = sedangMenghapus ? 60 : 110;

    if (!sedangMenghapus && posisiHuruf === nama.length) {
        sedangMenghapus = true;
        kecepatan = 2000;
    } else if (sedangMenghapus && posisiHuruf === 0) {
        sedangMenghapus = false;
        kecepatan = 500;
    }

    if (sedangMenghapus) {
        posisiHuruf = posisiHuruf - 1;
    } else {
        posisiHuruf = posisiHuruf + 1;
    }

    setTimeout(ketikNama, kecepatan);
}

setTimeout(ketikNama, 300);

// 3. Membuka dan menutup gambar proyek.
function bukaGambar(gambar) {
    var modal = document.getElementById('imageModal');
    var gambarModal = document.getElementById('modalImage');
    var judulGambar = document.getElementById('modalCaption');

    if (modal && gambarModal && judulGambar) {
        gambarModal.src = gambar.src;
        judulGambar.innerHTML = gambar.alt;
        modal.className = 'image-modal active';
    }
}

function tutupModal() {
    var modal = document.getElementById('imageModal');
    if (modal) {
        modal.className = 'image-modal';
    }
}

function tutupModalLuar(event) {
    var modal = document.getElementById('imageModal');
    if (event.target === modal) {
        tutupModal();
    }
}

window.onkeydown = function (event) {
    if (event.key === 'Escape') {
        tutupModal();
    }
};

// 4. Animasi foto saat halaman dibuka, disembunyikan, dan kembali ke Home.
var fotoProfil = document.getElementsByClassName('hero-photo-container')[0];
var fotoSedangTersembunyi = false;
var timerFoto;

function tampilkanFoto() {
    if (!fotoProfil) {
        return;
    }

    clearTimeout(timerFoto);
    fotoProfil.className = 'hero-photo-container foto-animasi-aktif';

    timerFoto = setTimeout(function () {
        fotoProfil.className = 'hero-photo-container';
    }, 1200);
}

// Mengakhiri kelas animasi awal setelah animasi selesai.
timerFoto = setTimeout(function () {
    if (fotoProfil && !fotoSedangTersembunyi) {
        fotoProfil.className = 'hero-photo-container';
    }
}, 1200);

function aturAnimasiFoto(posisiScroll) {
    if (!fotoProfil) {
        return;
    }

    if (posisiScroll > 180 && !fotoSedangTersembunyi) {
        clearTimeout(timerFoto);
        fotoProfil.className = 'hero-photo-container foto-tersembunyi';
        fotoSedangTersembunyi = true;
    }

    if (posisiScroll < 90 && fotoSedangTersembunyi) {
        fotoSedangTersembunyi = false;
        tampilkanFoto();
    }
}

// 5. Tombol kembali ke atas dan penanda menu aktif.
window.onscroll = function () {
    var posisiScroll = window.pageYOffset;
    var tombolKembali = document.getElementById('backToTop');
    var bagianHalaman = document.getElementsByTagName('section');
    var daftarMenu = document.getElementById('navLinks');

    aturAnimasiFoto(posisiScroll);

    if (tombolKembali) {
        if (posisiScroll > 300) {
            tombolKembali.className = 'back-to-top visible';
        } else {
            tombolKembali.className = 'back-to-top';
        }
    }

    if (daftarMenu) {
        var tautanMenu = daftarMenu.getElementsByTagName('a');
        var i;
        var j;

        for (i = 0; i < tautanMenu.length; i++) {
            tautanMenu[i].className = '';
        }

        for (i = 0; i < bagianHalaman.length; i++) {
            var bagian = bagianHalaman[i];
            var idBagian = bagian.getAttribute('id');

            if (idBagian) {
                var posisiAtas = bagian.offsetTop - 100;
                var posisiBawah = posisiAtas + bagian.offsetHeight;

                if (posisiScroll >= posisiAtas && posisiScroll < posisiBawah) {
                    for (j = 0; j < tautanMenu.length; j++) {
                        if (tautanMenu[j].getAttribute('href') === '#' + idBagian) {
                            tautanMenu[j].className = 'active';
                        }
                    }
                }
            }
        }
    }
};

// 6. Particle.js dipertahankan sebagai library tambahan untuk efek partikel.
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: ['#4f46e5', '#0284c7'] },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: true,
                anim: { enable: true, speed: 0.8, opacity_min: 0.25, sync: false }
            },
            size: { value: 3.5, random: true },
            line_linked: {
                enable: true,
                distance: 135,
                color: '#4f46e5',
                opacity: 0.28,
                width: 1.1
            },
            move: { enable: true, speed: 1.3 }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 150, line_linked: { opacity: 0.45 } },
                push: { particles_nb: 2 }
            }
        },
        retina_detect: true
    });
}

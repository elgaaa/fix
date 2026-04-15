// Memanggil library yang dibutuhkan
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware agar frontend dan backend bisa saling berkomunikasi
app.use(cors());
app.use(express.json()); // Untuk membaca data JSON yang dikirim dari HTML

// Membuat rute (endpoint) untuk menerima perintah kirim email
app.post('/api/send-email', async (req, res) => {
    // Menangkap data yang dikirim dari formulir HTML
    const { senderEmail, appPassword, subject, message } = req.body;
    const targetEmail = 'support@support.whatsapp.com';

    try {
        // Konfigurasi "Tukang Pos" (Transporter) menggunakan kredensial admin
        // Catatan: Ini diatur menggunakan Gmail sebagai contoh default.
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: senderEmail,
                pass: appPassword
            }
        });

        // Menyusun isi email
        const mailOptions = {
            from: senderEmail,
            to: targetEmail,
            subject: subject,
            text: message
        };

        // Memerintahkan transporter untuk mengirim email
        await transporter.sendMail(mailOptions);
        
        // Memberikan respon sukses ke HTML
        res.status(200).json({ success: true, message: 'Email berhasil dikirim ke Support WhatsApp!' });
    } catch (error) {
        console.error(error);
        // Memberikan respon gagal ke HTML jika ada error
        res.status(500).json({ success: false, message: 'Gagal mengirim email. Periksa kembali Sandi Aplikasi Anda.' });
    }
});

// Menyalakan server
app.listen(PORT, () => {
    console.log(`Server Backend berjalan dengan baik di http://localhost:${PORT}`);
});

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { fullName, email, subject, message } = await request.json();

    const data = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>", // Gunakan onboarding domain untuk testing
      to: ["wirapatigilang@gmail.com"],
      subject: `Pesan baru: ${subject} dari ${fullName}`,
      replyTo: email,
      html: `
        <h3>Ada pesan baru dari portofolio Anda!</h3>
        <p><strong>Nama:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subjek:</strong> ${subject}</p>
        <p><strong>Pesan:</strong><br/>${message}</p>
      `,
    });

    if (data.error) {
      return NextResponse.json({ message: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Pesan berhasil dikirim!", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Gagal mengirim email" }, { status: 500 });
  }
}

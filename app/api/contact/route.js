import axios from 'axios';
import { NextResponse } from 'next/server';

// Helper function to send a message via Telegram
async function sendTelegramMessage(token, chat_id, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    console.log('Attempting to send Telegram message...');
    console.log('Token exists:', !!token);
    console.log('Chat ID exists:', !!chat_id);
    
    const res = await axios.post(url, {
      text: message,
      chat_id,
    });
    
    console.log('Telegram API response:', res.data);
    return res.data.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error.response?.data || error.message);
    console.error('Full error:', error);
    return false;
  }
};

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message: userMessage } = payload;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id = process.env.TELEGRAM_CHAT_ID;

    // Validate environment variables
    if (!token || !chat_id) {
      return NextResponse.json({
        success: false,
        message: 'Telegram token or chat ID is missing.',
      }, { status: 400 });
    }

    const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    // Send Telegram message
    const telegramSuccess = await sendTelegramMessage(token, chat_id, message);

    if (telegramSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully!',
      }, { status: 200 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to send message.',
    }, { status: 500 });
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred.',
    }, { status: 500 });
  }
};
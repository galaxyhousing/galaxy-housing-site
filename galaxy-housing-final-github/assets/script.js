
const form = document.getElementById("bookingForm");
if(form){
  const checkin=document.getElementById("checkin");
  const checkout=document.getElementById("checkout");
  const guests=document.getElementById("guests");
  const error=document.getElementById("formError");

  const today=new Date();
  today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
  checkin.min=today.toISOString().split("T")[0];

  checkin.addEventListener("change",()=>{
    checkout.min=checkin.value;
    if(checkout.value && checkout.value<=checkin.value) checkout.value="";
  });

  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    error.textContent="";
    if(!checkin.value || !checkout.value || !guests.value){
      error.textContent="Lütfen tüm alanları doldurun.";
      return;
    }
    if(checkout.value<=checkin.value){
      error.textContent="Çıkış tarihi giriş tarihinden sonra olmalıdır.";
      return;
    }
    const fmt=v=>new Intl.DateTimeFormat("tr-TR").format(new Date(v+"T12:00:00"));
    const message=`Merhaba Galaxy Housing Çatalca,

Konaklama için müsaitlik bilgisi almak istiyorum.

📅 Giriş Tarihi: ${fmt(checkin.value)}
📅 Çıkış Tarihi: ${fmt(checkout.value)}
👥 Kişi Sayısı: ${guests.value}

Uygun konsept ev ve fiyat bilgisi paylaşabilir misiniz?`;
    window.open("https://wa.me/905065450409?text="+encodeURIComponent(message),"_blank","noopener");
  });
}

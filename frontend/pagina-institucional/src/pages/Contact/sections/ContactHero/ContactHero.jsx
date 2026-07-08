import HeroBase from '@/components/layout/HeroBase/HeroBase';
import styles from './ContactHero.module.css';

export default function ContactHero() {
  return (
    <HeroBase image="https://lh3.googleusercontent.com/aida-public/AB6AXuAWTVJyM8VUX9_6ejgKloEDvv6FJJWX8hkeoXGHuZZzx0k_ZEoRTN77zKaYQRPuPYSepGG2mpj0HassV2vGzNd0GqGA74cAvHug1zdnlAKzG9OgDJbXMsgSgxzUApB0u2S5ooUr6KU6VLSD9sDwaZDOBXWUXY7U6LWgILLfmP-zKQ0N0d7jbxmciB9KumkZwVnFB6DUF8j5JlWooTiHiNfFXIqDnW64xPcOv9Aa1FRRPFFnsx5Wh7XjJaha5nOpdoEdlZLVE5xv--U" height="716px">
      <h1 className={styles.title}>Conectemos con la Tradicion</h1>
      <p className={styles.subtitle}>Invitamos a compartir sus inquietudes y descubrir juntos la esencia de nuestras fibras ancestrales.</p>
    </HeroBase>
  );
}

import Image from "next/image";
import styles from "./StorySection.module.css";

export default function StorySection() {
  return (
    <section className={styles.storySection}>
      {/* Small section label */}
      <div className={styles.sectionLabel}>
        <span>[01]</span>
        <span> A STORY WORTH TELLING</span>
      </div>

      {/* Main headline */}
      <h1 className={styles.heading}>
        Forme Create for Brands that Value —
        <br />
        Clarity Over Noise, Believing that Meaningful
        <br />
        Design Begins with Intention and Grows.
      </h1>

      {/* Main image */}
      <div className={styles.imageWrapper}>
        <Image
          src="/Film Workshop.jpeg"
          alt="Creative studio"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
          className={styles.mainImage}
        />
      </div>

      {/* Barcode / vertical detail */}
      <div className={styles.barcodeWrapper}>
        <div className={styles.barcode}>
          {Array.from({ length: 32 }).map((_, index) => (
            <span
              key={index}
              style={{
                width: `${index % 3 === 0 ? 14 : index % 2 === 0 ? 8 : 11}px`,
              }}
            />
          ))}
        </div>

        <div className={styles.copyright}>©</div>
        <div className={styles.year}>2025–26</div>
      </div>

      {/* Bottom left content */}
      <div className={styles.bottomContent}>
        <div className={styles.stars}>
          <span>✱</span>
          <span>✱</span>
          <span className={styles.orange}>✱</span>
        </div>

        <p>
          We are a creative agency obsessed with clarity,
          <br />
          modern expression, clean aesthetics. Our
          <br />
          philosophy is design should feel effortless.
        </p>

        <a href="#more" className={styles.seeMore}>
          <span className={styles.arrow}>→</span>
          <span>SEE MORE</span>
        </a>
      </div>
    </section>
  );
}
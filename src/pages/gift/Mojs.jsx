import React, { useLayoutEffect, useRef } from "react";
import { ScrollScene } from "scrollscene";
import { gsap } from "gsap";
import lottie from "lottie-web";
import memojiJSON from "../../../public/assets/images/asd2.json";

export default (props) => {
  const MemojiRef = useRef(null);
  const MemojiContainerRef = useRef(null);
  useLayoutEffect(() => {
    if (MemojiRef === null && MemojiContainerRef === null) {
      return;
    }

    const AnimOptions = {
      container: MemojiRef.current,
      renderer: "canvas",
      loop: false,
      autoplay: false,
      animationData: memojiJSON,
    };
    const anim = lottie.loadAnimation(AnimOptions);
    const tl = gsap.timeline({ paused: true });

    tl.to({ frame: 0 }, 3, {
      frame: anim.totalFrames - 1,
      onUpdate: () => {
        anim.goToAndStop(Math.round(tl.progress() * 85), true);
      },
      ease: "power2.out",
    });

    const scrollScene = new ScrollScene({
      triggerElement: MemojiContainerRef.current,
      triggerHook: 0,
      offset: 0,
      duration: "400%",
      gsap: {
        timeline: tl,
      },
    });

    return () => {
      scrollScene.destroy();
    };
  }, []); // Empty dependency array to run only once

  return (
    <div ref={MemojiContainerRef} id="MemojiContainerRef">
      <div className="canv" ref={MemojiRef} />
      <div className="flex">
        <div className="h1">
          <h1>Perfume Representation</h1>
          <p>
            In the world of fragrance, effective representation is crucial to
            convey the essence and allure of a perfume product. Whether through
            visually captivating packaging, enticing advertisements, or
            immersive storytelling, the representation of a perfume sets the
            stage for an olfactory journey that goes beyond the mere sense of
            smell.
          </p>
          <ul>
            <li>Importance of Representation</li>
            <li>Conveying Essence and Allure</li>
            <li>Multi-sensory Experience</li>
            <li>Beyond Sense of Smell</li>
            <li>Role in Consumer Perception</li>
          </ul>
        </div>
        <div className="h1">
          <h1>Crafting an Alluring Image</h1>
          <p>
            The visual representation of a perfume product plays a pivotal role
            in capturing the consumer's attention. From the design of the bottle
            to the choice of colors and materials, every element contributes to
            the overall aesthetic appeal. A well-crafted visual representation
            not only communicates the brand's identity but also serves as a
            preview of the sensory experience that awaits those who choose to
            indulge in the fragrance.
          </p>
          <ul>
            <li>Bottle Design Importance</li>
            <li>Use of Colors and Materials</li>
            <li>Aesthetic Appeal</li>
            <li>Reflection of Brand Identity</li>
            <li>Preview of Sensory Experience</li>
          </ul>
        </div>
        <div className="h1">
          <h1>Engaging the Senses</h1>
          <p>
            Beyond the physical appearance, effective perfume representation
            extends into the realm of storytelling. Marketing campaigns become a
            canvas for weaving narratives around the scent, drawing consumers
            into a world of emotions, memories, and aspirations. The power of
            words and visuals collaborates to evoke a sensory journey that
            resonates with the individual, creating a lasting impression.
          </p>
          <ul>
            <li>Narrative Importance</li>
            <li>Marketing Campaigns as Canvas</li>
            <li>Emotion, Memory, Aspiration</li>
            <li>Collaborative Power of Words and Visuals</li>
            <li>Lasting Impression on Consumers</li>
          </ul>
        </div>
        <div className="h1">
          <h1>Building Trust through Representation</h1>
          <p>
            The representation of a perfume product is not merely about
            aesthetics but also about building trust with the consumer. Accurate
            and transparent representation, be it through ingredient disclosure,
            ethical sourcing practices, or sustainability initiatives,
            establishes a connection beyond the superficial. In an era where
            consumers seek authenticity, the way a perfume is represented
            contributes significantly to the brand-consumer relationship.
          </p>
          <ul>
            <li>Importance of Trust</li>
            <li>Accurate Representation</li>
            <li>Transparency in Disclosure</li>
            <li>Ethical Sourcing Practices</li>
            <li>Sustainability Initiatives Impact</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

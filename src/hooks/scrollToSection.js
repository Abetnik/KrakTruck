export const scrollToSection = (ref, offsetRatio = 0.2) => {
    if (!ref?.current) return;
  
    const offset = window.innerHeight * offsetRatio;
    const top = ref.current.getBoundingClientRect().top + window.scrollY - offset;
  
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };
  
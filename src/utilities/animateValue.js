function animateValue(obj, slider, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = ((progress * (end - start) + start) * 100).toFixed(1);
      slider.style.width = `${((progress * (end - start) + start) * 100).toFixed(1)}%`
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
}

export default animateValue;
document.addEventListener('DOMContentLoaded', () => {
  const animationContainer = document.getElementById('animation-container');
  
  if (!animationContainer) {
    console.error('Animation container not found!');
    return; // Now this is valid
  }

  const anim = lottie.loadAnimation({
    container: animationContainer,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'Kawaz heart.json'
  });

  anim.addEventListener('DOMLoaded', () => {
    console.log('Animation DOM loaded!');
  });

  anim.addEventListener('complete', () => {
    console.log('Animation complete!');
    animationContainer.style.display = 'none';
    document.querySelector('.container').style.display = 'block';
  });

  anim.addEventListener('data_failed', () => {
    console.error('Failed to load animation data!');
  });

  anim.addEventListener('error', (err) => {
    console.error('Animation error:', err);
  });
});

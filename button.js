/**
 * ==========================================================================
 * BUTTON INTERACTION & RIPPLE PHYSICS HELPER
 * ==========================================================================
 */

function createRippleEffect(event, buttonEl) {
  const rect = buttonEl.getBoundingClientRect();
  const circle = document.createElement('span');
  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add('ripple-effect');

  const existingRipple = buttonEl.querySelector('.ripple-effect');
  if (existingRipple) {
    existingRipple.remove();
  }

  buttonEl.appendChild(circle);

  circle.addEventListener('animationend', () => {
    circle.remove();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.inv-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!btn.disabled && !btn.classList.contains('is-loading')) {
        createRippleEffect(e, btn);
      }
    });
  });
});

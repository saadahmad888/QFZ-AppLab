// Leave Balances
document.querySelectorAll('.leave-names > div').forEach(updateProgressBar);

// Attendance Summary
document.querySelectorAll('.attend-summary-names > div').forEach(updateProgressBar);

function updateProgressBar(block) {
  const usedEl = block.querySelector('.used');
  const totalEl = block.querySelector('.total');
  const progressBar = block.querySelector('.progress-bar');

  if (usedEl && totalEl && progressBar) {
    const used = parseFloat(usedEl.dataset.used);
    const total = parseFloat(totalEl.dataset.total);

    if (!isNaN(used) && !isNaN(total) && total > 0) {
      const percentage = Math.round((used / total) * 100);
      progressBar.style.width = `${percentage}%`;
      progressBar.setAttribute('aria-valuenow', percentage);
    }
  }
}

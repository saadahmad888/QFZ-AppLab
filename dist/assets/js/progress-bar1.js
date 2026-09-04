document.querySelectorAll('.leave-names > div').forEach((leaveBlock) => {
  const usedEl = leaveBlock.querySelector('.used');
  const totalEl = leaveBlock.querySelector('.total');
  const progressBar = leaveBlock.querySelector('.progress-bar');

  if (usedEl && totalEl && progressBar) {
    const used = parseFloat(usedEl.dataset.used);
    const total = parseFloat(totalEl.dataset.total);

    if (!isNaN(used) && !isNaN(total) && total > 0) {
      const percentage = Math.round((used / total) * 100);
      progressBar.style.width = `${percentage}%`;
      progressBar.setAttribute('aria-valuenow', percentage);
    }
  }
});

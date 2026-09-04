document.addEventListener('DOMContentLoaded', function () {
  const present = parseInt(document.querySelector('.days-present h3.fw-700').textContent.trim()) || 0;
  const absent = parseInt(document.querySelector('.days-absent h3.fw-700').textContent.trim()) || 0;
  const late = parseInt(document.querySelector('.days-late h3.fw-700').textContent.trim()) || 0;

  const total = present + absent + late;

  const presentPercent = total ? (present / total) * 100 : 0;
  const absentPercent = total ? (absent / total) * 100 : 0;
  const latePercent = total ? (late / total) * 100 : 0;

  const progressSegments = document.querySelectorAll('.attn-summary-progress-bar .progress');

  if (progressSegments.length === 3) {
    progressSegments[0].style.width = `${presentPercent}%`;
    progressSegments[0].setAttribute('aria-valuenow', Math.round(presentPercent));

    progressSegments[1].style.width = `${absentPercent}%`;
    progressSegments[1].setAttribute('aria-valuenow', Math.round(absentPercent));

    progressSegments[2].style.width = `${latePercent}%`;
    progressSegments[2].setAttribute('aria-valuenow', Math.round(latePercent));
  }
});

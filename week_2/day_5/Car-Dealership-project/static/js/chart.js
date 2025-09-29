// static/js/chart.js
(function () {
  const money = (v) =>
    Number(v).toLocaleString(undefined, { maximumFractionDigits: 0 }) + " DH";

  function readJSON(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    try {
      return JSON.parse(el.textContent || "{}");
    } catch (e) {
      console.error("[charts] Bad JSON in #" + id, e);
      return null;
    }
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    if (typeof Chart === "undefined") {
      console.error("[charts] Chart.js not loaded.");
      return;
    }

    const data = readJSON("stats-json");
    if (!data) return;

    const {
      labelsMake = [], countsMake = [],
      labelsYear = [], countsYear = [],
      bucketLabels = [], bucketCounts = [],
      labelsAvgMake = [], valuesAvgMake = []
    } = data;

    const fmt = (n) => (typeof n === "number" ? n.toLocaleString() : n);

    const commonOpts = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: "bottom" },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const id = ctx.chart.canvas.id;
              const v = ctx.raw;
              if (id === "chartAvgPrice") return `${ctx.label}: ${money(v)}`;
              if (id === "chartBuckets")  return `${ctx.label}: ${fmt(v)}`;
              return `${ctx.dataset.label || ""} ${fmt(v)}`;
            }
          }
        }
      },
      scales: {
        x: { ticks: { maxRotation: 0, autoSkip: true } },
        y: { beginAtZero: true, ticks: { callback: (val) => fmt(val) } }
      }
    };

    const elMake = document.getElementById("chartByMake");
    if (elMake) new Chart(elMake, {
      type: "bar",
      data: { labels: labelsMake, datasets: [{ label: "Count", data: countsMake }] },
      options: commonOpts
    });

    const elYear = document.getElementById("chartByYear");
    if (elYear) new Chart(elYear, {
      type: "line",
      data: { labels: labelsYear, datasets: [{ label: "Count", data: countsYear, fill: false, tension: 0.2 }] },
      options: commonOpts
    });

    const elBuckets = document.getElementById("chartBuckets");
    if (elBuckets) new Chart(elBuckets, {
      type: "doughnut",
      data: { labels: bucketLabels, datasets: [{ data: bucketCounts }] },
      options: { ...commonOpts, scales: undefined, cutout: "55%" }
    });

    const elAvg = document.getElementById("chartAvgPrice");
    if (elAvg) new Chart(elAvg, {
      type: "bar",
      data: { labels: labelsAvgMake, datasets: [{ label: "Avg Price (DH)", data: valuesAvgMake }] },
      options: commonOpts
    });
  });
})();
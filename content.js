const colorPalettes = {
  green:  ['#39d353', '#26a641', '#006d32', '#0e4429'],
  yellow: ['#f2cc60', '#e3b341', '#c69026', '#8e6a1a'],
  red:    ['#fa7e7e', '#f44336', '#c62828', '#8b0000'],
  blue:   ['#4182eb', '#3572b0', '#0d47a1', '#002171'],
  purple: ['#e9d5ff', '#c084fc', '#9333ea', '#581c87'],
  pink:   ['#ffb6c1', '#ff69b4', '#db7093', '#8b0e3e']
};

function applyColor(colorName) {
  const palette = colorPalettes[colorName] || colorPalettes.green;
  const styleId = 'github-purple-style';
  let styleTag = document.getElementById(styleId);

  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }

  styleTag.textContent = `
    :root {
      --color-calendar-graph-day-L1-bg: ${palette[0]} !important;
      --color-calendar-graph-day-L2-bg: ${palette[1]} !important;
      --color-calendar-graph-day-L3-bg: ${palette[2]} !important;
      --color-calendar-graph-day-L4-bg: ${palette[3]} !important;
    }
    [data-level="1"] { fill: ${palette[0]} !important; background-color: ${palette[0]} !important; }
    [data-level="2"] { fill: ${palette[1]} !important; background-color: ${palette[1]} !important; }
    [data-level="3"] { fill: ${palette[2]} !important; background-color: ${palette[2]} !important; }
    [data-level="4"] { fill: ${palette[3]} !important; background-color: ${palette[3]} !important; }
    
    .ContributionCalendar-label { fill: var(--color-fg-muted) !important; }
  `;
}

chrome.storage.local.get('selectedColor', (data) => {
  applyColor(data.selectedColor || 'purple');
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.color) applyColor(request.color);
});
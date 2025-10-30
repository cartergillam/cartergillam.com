(function(){
  const subtitle = document.querySelector('.section__text__p2');
  const track = document.querySelector('.orbit-track');
  const chips = Array.from(document.querySelectorAll('.orbit .chip'));
  if(!subtitle || !track || chips.length === 0) return;

  const labels = new Map([
    ['chip-code',   'Software Developer'],
    ['chip-film',   'Videographer/Photographer'],
    ['chip-acting', 'Actor/Model'],
    ['chip-vibes',  'A Pretty Cool Dude']
  ]);

  function applySelection(idx){
    chips.forEach((chip, i) => chip.classList.toggle('is-selected', i === idx));
    const chosen = chips[idx];
    if(!chosen) return;
    for(const cls of chosen.classList){
      if(labels.has(cls)){
        subtitle.textContent = labels.get(cls);
        break;
      }
    }
  }

  function matricesToDeg(a, b){
    let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return (angle + 360) % 360;
  }

  function getRotationDeg(el){
    const st = window.getComputedStyle(el);
    const tr = st.transform;
    if(!tr || tr === 'none') return 0;
    if(tr.startsWith('matrix3d(')){
      const values = tr.slice(9, -1).split(',');
      return matricesToDeg(parseFloat(values[0]), parseFloat(values[1]));
    }
    if(tr.startsWith('matrix(')){
      const values = tr.slice(7, -1).split(',');
      return matricesToDeg(parseFloat(values[0]), parseFloat(values[1]));
    }
    return 0;
  }

  function angleToIndex(deg){
    const ang = (360 - deg) % 360;
    if(ang >= 315 || ang < 45) return 0;
    if(ang >= 45 && ang < 135) return 1;
    if(ang >= 135 && ang < 225) return 2;
    return 3;
  }

  let manualActive = false;
  let currentAutoIdx = 0;
  let lastComputedIdx = 0;

  chips.forEach((chip, idx) => {
    chip.addEventListener('mouseenter', () => {
      manualActive = true;
      applySelection(idx);
    });

    chip.addEventListener('mouseleave', () => {
      manualActive = false;
      if(lastComputedIdx !== currentAutoIdx){
        currentAutoIdx = lastComputedIdx;
        applySelection(currentAutoIdx);
      }
    });

    chip.addEventListener('focus', () => {
      manualActive = true;
      applySelection(idx);
    });

    chip.addEventListener('blur', () => {
      manualActive = false;
      if(lastComputedIdx !== currentAutoIdx){
        currentAutoIdx = lastComputedIdx;
        applySelection(currentAutoIdx);
      }
    });
  });

  function tick(){
    if(!document.body.contains(track)) return;
    const deg = getRotationDeg(track);
    const idx = angleToIndex(deg);
    lastComputedIdx = idx;
    if(!manualActive && idx !== currentAutoIdx){
      currentAutoIdx = idx;
      applySelection(idx);
    }
    requestAnimationFrame(tick);
  }

  applySelection(0);
  requestAnimationFrame(tick);
})();

// Media toggle for film page
(function(){
  const toggleGroups = document.querySelectorAll('.media-toggle');
  if(!toggleGroups.length) return;

  toggleGroups.forEach(group => {
    const buttons = Array.from(group.querySelectorAll('.toggle-button'));
    if(!buttons.length) return;
    const scope = group.closest('.content-section') || document;
    const galleries = Array.from(scope.querySelectorAll('[data-gallery]'));

    function activate(target){
      if(!target) return;
      buttons.forEach(btn => {
        const isActive = btn.dataset.target === target;
        btn.setAttribute('aria-pressed', String(isActive));
        btn.setAttribute('aria-selected', String(isActive));
        btn.setAttribute('tabindex', isActive ? '0' : '-1');
      });
      galleries.forEach(gallery => {
        const isMatch = gallery.dataset.gallery === target;
        gallery.classList.toggle('media-hidden', !isMatch);
        gallery.setAttribute('aria-hidden', String(!isMatch));
      });
    }

    const initial = buttons.find(btn => btn.getAttribute('aria-pressed') === 'true')?.dataset.target || buttons[0].dataset.target;
    activate(initial);

    buttons.forEach(btn => {
      const target = btn.dataset.target;
      if(!target) return;
      const handler = () => activate(target);
      btn.addEventListener('click', handler);
      btn.addEventListener('keydown', evt => {
        if(evt.key === 'Enter' || evt.key === ' '){
          evt.preventDefault();
          handler();
        }
      });
    });
  });
})();

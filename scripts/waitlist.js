function updateStatus(el, message, type = "success") {
  if (!el) return;
  el.textContent = message;
  el.classList.remove("text-emerald-700", "text-rose-600");
  el.classList.add(type === "success" ? "text-emerald-700" : "text-rose-600");
}

function ensureStatusElement(form) {
  var statusEl = form.querySelector('.waitlist-status');

  if (!statusEl) {
    var sibling = form.nextElementSibling;
    while (sibling) {
      if (sibling.classList && sibling.classList.contains('waitlist-status')) {
        statusEl = sibling;
        break;
      }
      if (sibling.classList && sibling.classList.contains('waitlist-form')) break;
      sibling = sibling.nextElementSibling;
    }
  }

  if (!statusEl && form.parentElement) {
    statusEl = Array.from(form.parentElement.children).find(function (child) {
      return child !== form && child.classList && child.classList.contains('waitlist-status');
    }) || null;
  }

  if (!statusEl) {
    statusEl = document.createElement('p');
    statusEl.className = 'waitlist-status text-xs mt-2';
    form.insertAdjacentElement('afterend', statusEl);
  }

  return statusEl;
}

document.addEventListener('DOMContentLoaded', function () {
  var yearSpan = document.getElementById('year-span');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  var forms = document.querySelectorAll('.waitlist-form');

  forms.forEach(function (form) {
    var statusEl = ensureStatusElement(form);

    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      var emailInput = form.querySelector('input[type="email"]');
      if (!emailInput) return;

      var source = form.getAttribute('data-source') || 'unknown';

      updateStatus(statusEl, 'Submitting...', 'success');

      try {
        var res = await fetch('https://bknoqgjxsbdzjutmmhnp.functions.supabase.co/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailInput.value,
            source: source,
            page_url: window.location.href
          })
        });

        if (res.ok) {
          emailInput.value = '';
          updateStatus(statusEl, "You're on the list.", 'success');
        } else {
          updateStatus(statusEl, 'Something went wrong. Please try again.', 'error');
        }
      } catch (e) {
        updateStatus(statusEl, 'Something went wrong. Please try again.', 'error');
      }
    });
  });
});

/**
 * Interactive Engineering Lab Sandboxes (Client-Side State-Machine Simulations):
 * 1. Kindie Multi-Student Attendance Sync
 * 2. Kodo BLE Diffuser Protocol Console (with disconnect auto-recovery & timer cleanup)
 * 3. BAMI Multi-Gateway Payment Abstraction (with centralized failure recovery & fallback)
 */

function initKindieSandbox() {
  const studentBtns = Array.from(document.querySelectorAll('[data-student-id]'));
  const resetBtn = document.getElementById('kindieResetBtn');
  const kpiPresent = document.getElementById('kpiPresent');
  const kpiPicked = document.getElementById('kpiPicked');
  const kpiQueue = document.getElementById('kpiQueue');
  const phonePush = document.getElementById('phonePush');
  const phoneMsg = document.getElementById('phoneMsg');

  if (studentBtns.length === 0 || !kpiPresent || !kpiPicked || !kpiQueue) return;

  const BASE_PRESENT = 15;
  const PICKUP_QUEUE_TOTAL = studentBtns.length;
  const pickedSet = new Set();

  const flashKpis = () => {
    document.querySelectorAll('#kindieKpis .mini-kpi').forEach((el) => {
      el.classList.add('kpi-flash');
      setTimeout(() => el.classList.remove('kpi-flash'), 320);
    });
  };

  const renderState = (lastAction = null) => {
    const pickedCount = pickedSet.size;
    kpiPresent.textContent = String(BASE_PRESENT - pickedCount);
    kpiPicked.textContent = String(pickedCount);
    kpiQueue.textContent = `${pickedCount}/${PICKUP_QUEUE_TOTAL}`;

    studentBtns.forEach((btn) => {
      const id = btn.dataset.studentId;
      const isPicked = pickedSet.has(id);
      const badge = btn.querySelector('.badge-state');
      btn.classList.toggle('is-picked', isPicked);
      btn.setAttribute('aria-pressed', String(isPicked));
      if (badge) {
        badge.textContent = isPicked ? 'PICKED UP' : 'IN CLASS';
        badge.classList.toggle('done', isPicked);
      }
    });

    if (resetBtn) {
      resetBtn.disabled = pickedCount === 0;
    }

    if (lastAction && phonePush && phoneMsg) {
      const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      if (lastAction.type === 'pickup') {
        phonePush.classList.add('verified');
        phoneMsg.innerHTML = `<span class="text-success">Synced (${time}):</span> Parent push dispatched — ${lastAction.name} checked out safely.`;
      } else if (lastAction.type === 'revert' && pickedCount > 0) {
        phonePush.classList.add('verified');
        phoneMsg.textContent = `Reverted ${lastAction.name} to In Class (${time}). ${pickedCount}/${PICKUP_QUEUE_TOTAL} pickup check-outs active.`;
      } else {
        phonePush.classList.remove('verified');
        phoneMsg.textContent = 'Select any student on the Teacher App to dispatch real-time sync.';
      }
    }
  };

  studentBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.studentId;
      const name = btn.dataset.studentName || 'Student';
      const adding = !pickedSet.has(id);
      if (adding) {
        pickedSet.add(id);
      } else {
        pickedSet.delete(id);
      }
      flashKpis();
      renderState({ type: adding ? 'pickup' : 'revert', name });
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      pickedSet.clear();
      flashKpis();
      renderState({ type: 'reset' });
    });
  }

  renderState();
}

function initKodoSandbox() {
  const bleScan = document.getElementById('bleScan');
  const bleAuth = document.getElementById('bleAuth');
  const bleSend = document.getElementById('bleSend');
  const bleDrop = document.getElementById('bleDrop');
  const bleReset = document.getElementById('bleReset');
  const bleLog = document.getElementById('bleLog');
  const intensityBtns = document.querySelectorAll('[data-ble-intensity]');
  const oilLabel = document.getElementById('bleOilLabel');
  const oilFill = document.getElementById('bleOilFill');

  if (!bleScan || !bleAuth || !bleSend || !bleReset || !bleLog) return;

  const PRESETS = {
    LOW: { workSec: 5, pauseSec: 140, drain: 1 },
    MED: { workSec: 10, pauseSec: 100, drain: 2 },
    HIGH: { workSec: 15, pauseSec: 60, drain: 3 },
  };

  let activeIntensity = 'MED';
  let oilMl = 165;
  const pendingTimers = new Set();

  const scheduleBle = (fn, delayMs) => {
    const id = setTimeout(() => {
      pendingTimers.delete(id);
      fn();
    }, delayMs);
    pendingTimers.add(id);
  };

  const clearPendingBleTimers = () => {
    pendingTimers.forEach((id) => clearTimeout(id));
    pendingTimers.clear();
  };

  const updateOilUi = () => {
    if (oilLabel) oilLabel.textContent = `${oilMl}/200ml`;
    if (oilFill) oilFill.style.width = `${Math.max(5, (oilMl / 200) * 100)}%`;
  };

  const logBle = (tag, cls, text) => {
    const ts = new Date().toLocaleTimeString('en-GB', { hour12: false });
    const row = document.createElement('div');
    row.innerHTML = `<span class="t-dim">[${ts}]</span> <span class="${cls}">[${tag}]</span> ${text}`;
    bleLog.appendChild(row);
    bleLog.scrollTop = bleLog.scrollHeight;
  };

  intensityBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      intensityBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      activeIntensity = btn.dataset.bleIntensity;
    });
  });

  bleScan.addEventListener('click', () => {
    bleScan.disabled = true;
    logBle('SCAN', 't-blue', 'Scanning BLE peripherals (16s timeout)...');
    scheduleBle(() => {
      logBle('FOUND', 't-green', 'Kodo RadarX (SA_KDAir 2.up) • RSSI -52dBm. GATT resolved.');
      bleAuth.disabled = false;
    }, 450);
  });

  bleAuth.addEventListener('click', () => {
    bleAuth.disabled = true;
    logBle('AUTH', 't-blue', 'Verifying 4-digit PIN handshake over GATT characteristic...');
    scheduleBle(() => {
      logBle('ACK', 't-green', 'PIN verified. Diffuser switched to App Mode.');
      bleSend.disabled = false;
      if (bleDrop) bleDrop.disabled = false;
    }, 420);
  });

  bleSend.addEventListener('click', () => {
    const preset = PRESETS[activeIntensity];
    logBle(
      'TX',
      't-amber',
      `Write Config: { intensity: "${activeIntensity}", workSec: ${preset.workSec}, pauseSec: ${preset.pauseSec}, occupancy: "1-5" }`
    );
    scheduleBle(() => {
      oilMl = Math.max(20, oilMl - preset.drain);
      updateOilUi();
      logBle('NOTIFY', 't-green', `Diffuser active. Oil telemetry: ${oilMl}/200ml.`);
    }, 300);
  });

  if (bleDrop) {
    bleDrop.addEventListener('click', () => {
      bleDrop.disabled = true;
      bleSend.disabled = true;
      logBle('WARN', 't-red', 'Peripheral link dropped (GATT 133). Triggering auto-reconnect...');
      scheduleBle(() => {
        logBle('RECOVER', 't-blue', 'Re-bonding Kodo RadarX via cached peripheral UUID...');
      }, 360);
      scheduleBle(() => {
        logBle('ACK', 't-green', 'GATT session restored. App Mode active.');
        bleSend.disabled = false;
        bleDrop.disabled = false;
      }, 820);
    });
  }

  bleReset.addEventListener('click', () => {
    clearPendingBleTimers();
    bleScan.disabled = false;
    bleAuth.disabled = true;
    bleSend.disabled = true;
    if (bleDrop) bleDrop.disabled = true;
    oilMl = 165;
    updateOilUi();
    bleLog.innerHTML = '<div><span class="t-dim">[INIT]</span> BLE Central Manager ready. Waiting to scan...</div>';
  });

  updateOilUi();
}

function initBamiSandbox() {
  const payMethods = document.querySelectorAll('.pay-method');
  const payOutput = document.getElementById('payOutput');
  const runPayBtn = document.getElementById('runPayBtn');
  const failToggle = document.getElementById('payFailToggle');
  const stepToken = document.getElementById('payStepToken');
  const stepAuth = document.getElementById('payStepAuth');
  const stepQueue = document.getElementById('payStepQueue');

  if (payMethods.length === 0 || !payOutput || !runPayBtn) return;

  const ADAPTERS = {
    'Apple Pay (Wallet)': 'presentApplePay() -> PKPaymentToken',
    'Google Pay API': 'loadPaymentData() -> GooglePayToken',
    'Stripe PaymentSheet': 'confirmPaymentSheet() -> PaymentIntent',
    'ANZ Payment Gateway': 'createHostedSession() -> ANZSessionId',
  };

  let activeProvider = 'Apple Pay (Wallet)';
  let isProcessing = false;
  const payTimers = new Set();

  const schedulePay = (fn, delayMs) => {
    const id = setTimeout(() => {
      payTimers.delete(id);
      fn();
    }, delayMs);
    payTimers.add(id);
  };

  const clearPayTimers = () => {
    payTimers.forEach((id) => clearTimeout(id));
    payTimers.clear();
  };

  const resetSteps = () => {
    [stepToken, stepAuth, stepQueue].forEach((el) => {
      if (!el) return;
      el.classList.remove('is-running', 'is-done', 'is-error');
    });
  };

  const selectProviderUi = (providerName) => {
    activeProvider = providerName;
    payMethods.forEach((m) => {
      const isMatch = m.dataset.provider === providerName;
      m.classList.toggle('active', isMatch);
      m.setAttribute('aria-pressed', String(isMatch));
    });
  };

  const renderIdle = () => {
    resetSteps();
    payOutput.innerHTML = `Adapter: <strong>${activeProvider}</strong> • <code>${ADAPTERS[activeProvider]}</code>`;
  };

  const runCheckout = ({ forceSuccess = false } = {}) => {
    if (isProcessing) return;
    clearPayTimers();
    isProcessing = true;
    runPayBtn.disabled = true;
    resetSteps();

    const shouldFail = !forceSuccess && Boolean(failToggle?.checked);

    if (stepToken) stepToken.classList.add('is-running');
    payOutput.innerHTML = `Tokenizing via <strong>${activeProvider}</strong> (<code>${ADAPTERS[activeProvider]}</code>)...`;

    schedulePay(() => {
      if (stepToken) {
        stepToken.classList.remove('is-running');
        stepToken.classList.add('is-done');
      }
      if (stepAuth) stepAuth.classList.add('is-running');
      payOutput.innerHTML = `Authorizing <strong>$13.00 AUD</strong> charge and verifying store pickup slot...`;
    }, 320);

    schedulePay(() => {
      if (shouldFail) {
        if (stepAuth) {
          stepAuth.classList.remove('is-running');
          stepAuth.classList.add('is-error');
        }
        const fallbackProvider =
          activeProvider === 'Stripe PaymentSheet' ? 'ANZ Payment Gateway' : 'Stripe PaymentSheet';
        const fallbackLabel =
          fallbackProvider === 'Stripe PaymentSheet' ? 'Stripe Fallback' : 'ANZ Fallback';

        payOutput.innerHTML =
          `<span class="text-danger">✗ Authorization Failed (err_gateway_504):</span> ` +
          `${activeProvider} timed out — cart preserved.` +
          `<button type="button" id="payRetryFallbackBtn" class="pay-retry-btn">Retry via ${fallbackLabel} →</button>`;

        runPayBtn.disabled = false;
        isProcessing = false;

        document.getElementById('payRetryFallbackBtn')?.addEventListener('click', () => {
          selectProviderUi(fallbackProvider);
          runCheckout({ forceSuccess: true });
        });
        return;
      }

      if (stepAuth) {
        stepAuth.classList.remove('is-running');
        stepAuth.classList.add('is-done');
      }
      if (stepQueue) stepQueue.classList.add('is-done');

      const token = 'tok_' + Math.random().toString(36).substring(2, 10);
      payOutput.innerHTML = `<span class="text-success">✓ Confirmed ($13.00 AUD):</span> Token <code>${token}</code> • Click &amp; Collect <strong>#CBXMCP3PW</strong> queued.`;
      runPayBtn.disabled = false;
      isProcessing = false;
    }, 760);
  };

  payMethods.forEach((el) => {
    el.addEventListener('click', () => {
      if (isProcessing) return;
      selectProviderUi(el.dataset.provider);
      renderIdle();
    });
  });

  runPayBtn.addEventListener('click', () => runCheckout());
  renderIdle();
}

export function initSandboxes() {
  initKindieSandbox();
  initKodoSandbox();
  initBamiSandbox();
}

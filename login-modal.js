// Login Modal Feature
// Drop this file into your project and include it with:
// <script src="login-modal.js"></script>

(function () {
    // Inject styles so no CSS file modification is required
    const style = document.createElement("style");
    style.textContent = `
    .lp-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
  
    .lp-modal {
      width: 360px;
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.2);
      animation: lpFade .2s ease;
      font-family: Arial, Helvetica, sans-serif;
    }
  
    @keyframes lpFade {
      from { transform: translateY(10px); opacity: 0 }
      to { transform: translateY(0); opacity: 1 }
    }
  
    .lp-modal h2 { margin-top: 0; }
  
    .lp-field {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border-radius: 6px;
      border: 1px solid #d1d5db;
    }
  
    .lp-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
    }
  
    .lp-btn {
      padding: 10px 14px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
    }
  
    .lp-primary { background:#2563eb; color:white; }
    .lp-primary:hover { background:#1d4ed8; }
  
    .lp-cancel { background:#e5e7eb; }
  
    .lp-error {
      color: #dc2626;
      font-size: 13px;
      min-height: 18px;
    }
    `;
    document.head.appendChild(style);
  
    // Create modal
    const overlay = document.createElement("div");
    overlay.className = "lp-overlay";
    overlay.innerHTML = `
      <div class="lp-modal">
        <h2>Employee Login</h2>
        <input class="lp-field" id="lp-user" placeholder="Employee ID">
        <input class="lp-field" id="lp-pass" type="password" placeholder="Password">
        <div class="lp-error" id="lp-error"></div>
        <div class="lp-actions">
          <button class="lp-btn lp-cancel">Cancel</button>
          <button class="lp-btn lp-primary">Login</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  
    function openModal() {
      overlay.style.display = "flex";
      document.getElementById("lp-error").textContent = "";
    }
  
    function closeModal() {
      overlay.style.display = "none";
    }
  
    function validateLogin() {
      const user = document.getElementById("lp-user").value.trim();
      const pass = document.getElementById("lp-pass").value.trim();
      const error = document.getElementById("lp-error");
  
      if (!user || !pass) {
        error.textContent = "All fields are required";
        return;
      }
  
      // Fake authentication (replace with API later)
      if (user === "emp123" && pass === "password") {
        closeModal();
        document.dispatchEvent(new CustomEvent("employee:login", { detail: { user } }));
        alert("Login successful — redirect to dashboard later");
      } else {
        error.textContent = "Invalid credentials";
      }
    }
  
    // Attach to existing Login button
    window.addEventListener("DOMContentLoaded", () => {
      const loginBtn = document.querySelector(".btn");
      if (loginBtn) loginBtn.addEventListener("click", openModal);
    });
  
    overlay.querySelector(".lp-cancel").onclick = closeModal;
    overlay.querySelector(".lp-primary").onclick = validateLogin;
    overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
  })();
import React, { useRef, useState, useEffect } from "react";
import whiteLogo from "../../assets/whiteLogo.png";
import { registerInvasion } from "../../api";
import "./index.css";

const Certificate = () => {
  const canvasRef = useRef(null);
  const prevPhotoRef = useRef(null);

  const [photo, setPhoto] = useState(null); // blob/object URL
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    church: "",
  });
  const [isGenerated, setIsGenerated] = useState(false);
  const [step, setStep] = useState(1);

  // Clean up blob URL when component unmounts
  useEffect(() => {
    return () => {
      if (prevPhotoRef.current) {
        URL.revokeObjectURL(prevPhotoRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // revoke previous URL
    if (prevPhotoRef.current) {
      URL.revokeObjectURL(prevPhotoRef.current);
    }

    const url = URL.createObjectURL(file);
    prevPhotoRef.current = url;
    setPhoto(url);
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    const { fullName, email, address, church, phone } = formData;
  
    if (!fullName || !email || !address || !church) {
      alert("Please fill in all fields before continuing.");
      return;
    }
  
    try {
      // Call backend API
      const payload = {
        name: fullName,
        email,
        phone,
        address,
        church,
        event: "Invasion 2025",
      };
  
      const response = await registerInvasion(payload);
      console.log("✅ Registration saved:", response);
  
      // Only move forward if API succeeded
      setStep(2);
    } catch (error) {
      console.error("❌ Registration failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };  

  const drawBase = (ctx, canvas) => {
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#facc15");
    gradient.addColorStop(1, "#b45309");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = "#065f46";
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    const logo = new Image();
logo.src = whiteLogo;
logo.onload = () => {
  const desiredWidth = 100; // set only width
  const aspectRatio = logo.width / logo.height;
  const desiredHeight = desiredWidth / aspectRatio; // auto-calc height

  ctx.drawImage(logo, 20, 10, desiredWidth, desiredHeight);
};


    // Title
    ctx.fillStyle = "#fff";
    ctx.font = "bold 28px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("I WILL BE ATTENDING", canvas.width / 2, 84);

    // Theme
    ctx.fillStyle = "#15803d";
    ctx.font = "bold 36px Verdana";
    ctx.fillText("INVASION", canvas.width / 2, 150);
  };

  const drawNameAndDate = (ctx, canvas, yForName = 320) => {
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(formData.fullName, canvas.width / 2, yForName);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 20px Georgia";
    ctx.fillText("September 27, 2025", canvas.width / 2, canvas.height - 34);
  };

  const generateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw base immediately (this clears too)
    drawBase(ctx, canvas);

    // If there's a photo, draw it and then draw the name/date.
    if (photo) {
      const img = new Image();
      // don't set crossOrigin for blob URLs; leave it unset
      img.src = photo;

      img.onload = () => {
        const photoSize = Math.min(140, Math.round(canvas.width * 0.18)); // responsive-ish
        const centerX = canvas.width / 2;
        const centerY = 220;

        // Circular clip then draw image
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, photoSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(
          img,
          centerX - photoSize / 2,
          centerY - photoSize / 2,
          photoSize,
          photoSize
        );
        ctx.restore();

        // Border around photo
        ctx.beginPath();
        ctx.arc(centerX, centerY, photoSize / 2 + 3, 0, Math.PI * 2);
        ctx.strokeStyle = "#15803d";
        ctx.lineWidth = 4;
        ctx.stroke();

        // Draw name and date a bit lower
        drawNameAndDate(ctx, canvas, centerY + photoSize / 2 + 44);

        // now reveal the canvas
        setIsGenerated(true);
      };

      img.onerror = () => {
        console.error("Image failed to load. Drawing without photo.");
        // still draw name & date
        drawNameAndDate(ctx, canvas);
        setIsGenerated(true);
      };
    } else {
      // no photo
      drawNameAndDate(ctx, canvas);
      setIsGenerated(true);
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "attendance.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const resetToPreview = () => {
    setIsGenerated(false);
  };

  return (
    <div className="certificate-container">
        {step === 1 && <div>
            <h1 className="head-title">Register for Invasion-2025</h1>
        </div>}
        {step === 2 && <div>
            <h1 className="head-title">Generate and download attendance Image below</h1>
        </div>}
      {step === 1 && (
        <form onSubmit={handleContinue} className="certificate-form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Home Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="church"
            placeholder="Church"
            value={formData.church}
            onChange={handleChange}
            required
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button type="submit" className="btn">
            Continue
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="certificate-step2">
          {/* preview card (hidden when isGenerated) */}
          <div
            className="preview-card"
            style={{ display: isGenerated ? "none" : "flex" }}
          >
            <div className="dp-frame">
              {photo ? (
                <img src={photo} alt="Preview" className="dp-img" />
              ) : (
                <div className="dp-placeholder">
                  <div>DP</div>
                  <div className="small-name">{formData.fullName || ""}</div>
                </div>
              )}
            </div>

            <button onClick={generateImage} className="btn">
              Generate Attendance Image
            </button>
          </div>

          {/* canvas card (kept in DOM; shown when isGenerated) */}
          <div
            className="canvas-card"
            style={{ display: isGenerated ? "flex" : "none" }}
          >
            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="canvas-box"
                style={{ width: "100%", height: "auto" }} // responsive scaling
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={download} className="btn">
                Download Image
              </button>
              <button onClick={resetToPreview} className="btn secondary">
                Back
              </button>
            </div>
            <div>
                <a href="https://bit.ly/4800JL6" target="_blank" rel="noopener noreferrer">
                    Recomended: Please fill our our google form
                </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;

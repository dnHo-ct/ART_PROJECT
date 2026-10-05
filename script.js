function setupUpload(inputId, previewId, isVideo = false) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    if (!input || !preview) {
        console.error(
            "Élément introuvable :",
            inputId,
            previewId
        );
        return;
    }

    const frame = input.closest(".media-upload");

    input.addEventListener("change", function () {
        const file = input.files[0];

        if (!file) return;

        const url = URL.createObjectURL(file);

        /* =========================
           VIDÉO
        ========================= */

        if (isVideo) {

            preview.hidden = false;
            preview.style.display = "block";

            preview.pause();
            preview.removeAttribute("src");

            preview.src = url;

            preview.controls = true;
            preview.muted = true;
            preview.playsInline = true;

            preview.load();

            preview.onloadeddata = function () {

                if (frame) {
                    frame.classList.add("has-media");
                }

            };

            preview.onerror = function () {

                console.error(
                    "Impossible de lire cette vidéo :",
                    file.type
                );

                if (frame) {
                    frame.classList.remove("has-media");
                }

                preview.hidden = true;

                alert(
                    "Cette vidéo ne peut pas être lue par le navigateur."
                );
            };

        }

        /* =========================
           IMAGE
        ========================= */

        else {

            preview.hidden = false;
            preview.src = url;
            preview.style.display = "block";

            if (frame) {
                frame.classList.add("has-media");
            }
        }
    });
}


/* =========================
   IMAGE PRINCIPALE
========================= */

setupUpload(
    "heroImage",
    "heroPreview"
);


/* =========================
   VIDÉO
========================= */

setupUpload(
    "processVideo",
    "videoPreview",
    true
);


/* =========================
   GALERIE
========================= */

for (let i = 1; i <= 10; i++) {

    const number = String(i).padStart(2, "0");

    setupUpload(
        "gallery" + number,
        "galleryPreview" + number
    );
}


console.log(
    "ART PROJECT — système média local chargé"
);

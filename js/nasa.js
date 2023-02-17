let infoNasa = document.querySelector("#infoNasa");

const fetcNasa = async () => {
  try {
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=juKs8K6KBN5kfEIsWatJemP5Dxyfrmksfp8L9Isw"
    );
    const data = await response.json();
    console.log(data);

    const spaceInfo = document.createElement("div");
    spaceInfo.className = "imgnasa";
    spaceInfo.innerHTML = `
    <img src="${data.url}"></img>
    <h4>${data.explanation}</h4>
    `;

    infoNasa.append(spaceInfo);
  } catch (err) {
    console.log(err)
  }

  };

fetcNasa();

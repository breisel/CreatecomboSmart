
const IMAGE_SIZE = 50;
const IMAGES_PER_ROW = 5;

const imageContainer = document.querySelector('.image-container');

document.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.hasAttribute('data-image')) {
        addImage(target.getAttribute('data-image'));
    } else if (target.id === 'newLineBtn') {
        addElement('br');
    } else if (target.id === 'addTextBoxBtn') {
        addTextBox();
    } else if (target.id === 'removeLastBtn') {
        removeLastElement();
    } else if (target.id === 'mergeImages') {
        mergeImages();
    }
});

function addElement(tagName, attributes = {}) {
    const element = document.createElement(tagName);
    Object.assign(element, attributes);
    imageContainer.appendChild(element);
}

function addImage(imageSrc) {
    addElement('img', {
        src: imageSrc,
        alt: '選択された画像',
        onerror: () => console.error(`Failed to load image: ${imageSrc}`)
    });
}

function addTextBox() {
    addElement('input', {
        type: 'text',
        placeholder: 'テキストを入力'
    });
}

function removeLastElement() {
    const lastElement = imageContainer.lastElementChild;
    if (lastElement) lastElement.remove();
}

function mergeImages() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const images = document.querySelectorAll('.image-container img');
  
  // キャンバスのサイズを設定
  const imageSize = 50; // 各画像のサイズ
  const imagesPerRow = 5; // 1行あたりの画像数
  const rows = Math.ceil(images.length / imagesPerRow);
  canvas.width = imageSize * imagesPerRow;
  canvas.height = imageSize * rows;

  // 画像をキャンバスに描画
  images.forEach((img, index) => {
    const x = (index % imagesPerRow) * imageSize;
    const y = Math.floor(index / imagesPerRow) * imageSize;
    ctx.drawImage(img, x, y, imageSize, imageSize);
  });

  // 新しい画像としてダウンロード
  const link = document.createElement('a');
  link.download = 'merged_image.png';
  link.href = canvas.toDataURL();
  link.click();
}

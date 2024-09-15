function roundUpPrice(price) {
  let numericPrice = price.replace(/[^0-9,.-]/g, '').replace(',', '.');
  let parsedPrice = parseFloat(numericPrice);
  
  if (Number.isInteger(parsedPrice)) {
    // For integer prices, round up to the next hundred
    return Math.ceil(parsedPrice / 100) * 100;
  } else {
    // For decimal prices, round up to the next whole number
    return Math.ceil(parsedPrice);
  }
}

function modifyPrice(element) {
  let priceText = element.textContent.trim();
  let match = priceText.match(/(\d+(?:[.,]\d+)?)/);
  if (match) {
    let originalPrice = match[1];
    let roundedPrice = roundUpPrice(originalPrice);
    
    // Create a new span for the rounded price
    let roundedPriceSpan = document.createElement('span');
    roundedPriceSpan.textContent = roundedPrice.toLocaleString('de-DE') + ' €';
    roundedPriceSpan.style.color = 'red';
    roundedPriceSpan.style.fontWeight = 'bold';

    // Create a new span for the original price
    let originalPriceSpan = document.createElement('span');
    originalPriceSpan.textContent = originalPrice + ' €';
    originalPriceSpan.style.textDecoration = 'line-through';
    originalPriceSpan.style.color = 'gray';
    originalPriceSpan.style.opacity = '0.5';
    originalPriceSpan.style.fontSize = '0.8em';
    originalPriceSpan.style.marginLeft = '5px';

    // Clear the original content and append new spans
    element.textContent = '';
    element.appendChild(roundedPriceSpan);
    element.appendChild(originalPriceSpan);
  }
}

function modifyAmazonPrices() {
  const selectors = [
    '.a-price',
    '.a-color-price',
    '.p13n-sc-price',
    '.a-price-whole',
    '.Price__price__LKpWT',
    '._cDEzb_p13n-sc-price_3mJ9Z'
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      if (!element.classList.contains('price-modified')) {
        modifyPrice(element);
        element.classList.add('price-modified');
      }
    });
  });
}

// Run the function when the page loads
modifyAmazonPrices();

// Use a MutationObserver to handle dynamically loaded content
const observer = new MutationObserver(modifyAmazonPrices);
observer.observe(document.body, { childList: true, subtree: true });
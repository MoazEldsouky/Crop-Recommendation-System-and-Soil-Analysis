// Form handling for crop recommendation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crop-form');
    const inputs = form.querySelectorAll('input[type="number"]');
    const loadingIndicator = document.getElementById('loading');
    const resetButton = document.getElementById('reset-button');
    
    // Arabic crop names mapping
    const arabicCropNames = {
        'rice': 'الأرز',
        'maize': 'الذرة',
        'chickpea': 'الحمص',
        'kidneybeans': 'الفاصوليا',
        'pigeonpeas': 'البازلاء',
        'mothbeans': 'الفول',
        'mungbean': 'اللوبيا',
        'blackgram': 'العدس الأسود',
        'lentil': 'العدس',
        'pomegranate': 'الرمان',
        'grapes': 'العنب',
        'watermelon': 'البطيخ',
        'muskmelon': 'الشمام',
        'apple': 'التفاح',
        'orange': 'البرتقال',
        'papaya': 'البابايا',
        'coconut': 'جوز الهند',
        'cotton': 'القطن',
        'jute': 'الجوت',
        'coffee': 'البن',
        'banana': 'الموز',
        'mango': 'المانجو',
        'cucumber': 'الخيار',
        'tomato': 'الطماطم',
        'potato': 'البطاطس',
        'onion': 'البصل',
        'garlic': 'الثوم',
        'ginger': 'الزنجبيل',
        'turmeric': 'الكركم',
        'pepper': 'الفلفل',
        'chilli': 'الفلفل الحار',
        'cabbage': 'الملفوف',
        'cauliflower': 'القرنبيط',
        'brinjal': 'الباذنجان',
        'carrot': 'الجزر',
        'radish': 'الفجل',
        'beetroot': 'البنجر',
        'spinach': 'السبانخ',
        'lettuce': 'الخس',
        'pumpkin': 'اليقطين',
        'sweetpotato': 'البطاطا الحلوة',
        'yam': 'اليام',
        'cassava': 'الكسافا',
        'tapioca': 'التابيوكا',
        'soybean': 'فول الصويا',
        'groundnut': 'الفول السوداني',
        'sunflower': 'عباد الشمس',
        'sesame': 'السمسم',
        'mustard': 'الخردل',
        'rapeseed': 'الكانولا',
        'safflower': 'القرطم',
        'castor': 'الخروع',
        'linseed': 'بذر الكتان',
        'tobacco': 'التبغ',
        'tea': 'الشاي',
        'rubber': 'المطاط',
        'sugarcane': 'قصب السكر',
        'wheat': 'القمح',
        'barley': 'الشعير',
        'oats': 'الشوفان',
        'rye': 'الجاودار',
        'millet': 'الدخن',
        'sorghum': 'الذرة الرفيعة',
        'bajra': 'الدخن اللؤلؤي',
        'ragi': 'الدخن الإصبعي',
        'gram': 'الحمص',
        'moong': 'اللوبيا',
        'urad': 'العدس الأسود',
        'masoor': 'العدس',
        'peas': 'البازلاء',
        'beans': 'الفاصوليا',
        'lentils': 'العدس',
        'chickpeas': 'الحمص',
        'pigeon peas': 'البازلاء',
        'moth beans': 'الفول',
        'mung beans': 'اللوبيا',
        'black gram': 'العدس الأسود',
        'green gram': 'اللوبيا الخضراء',
        'red gram': 'العدس الأحمر',
        'yellow gram': 'العدس الأصفر',
        'brown gram': 'العدس البني',
        'white gram': 'العدس الأبيض',
        'black eyed peas': 'اللوبيا',
        'cowpea': 'اللوبيا',
        'hyacinth bean': 'اللوبيا',
        'lablab': 'اللوبيا',
        'winged bean': 'الفاصوليا المجنحة',
        'velvet bean': 'الفاصوليا المخملية',
        'jack bean': 'الفاصوليا',
        'sword bean': 'الفاصوليا السيفية',
        'lima bean': 'الفاصوليا البيضاء',
        'kidney bean': 'الفاصوليا الحمراء',
        'navy bean': 'الفاصوليا البيضاء',
        'pinto bean': 'الفاصوليا المرقطة',
        'black bean': 'الفاصوليا السوداء',
        'white bean': 'الفاصوليا البيضاء',
        'red bean': 'الفاصوليا الحمراء',
        'yellow bean': 'الفاصوليا الصفراء',
        'green bean': 'الفاصوليا الخضراء',
        'wax bean': 'الفاصوليا الشمعية',
        'snap bean': 'الفاصوليا القابلة للكسر',
        'string bean': 'الفاصوليا الخيطية',
        'pole bean': 'الفاصوليا العمودية',
        'bush bean': 'الفاصوليا الشجيرية',
        'runner bean': 'الفاصوليا المتسلقة',
        'yardlong bean': 'الفاصوليا الطويلة',
        'asparagus bean': 'الفاصوليا الهليونية',
        'winged bean': 'الفاصوليا المجنحة',
        'velvet bean': 'الفاصوليا المخملية',
        'jack bean': 'الفاصوليا',
        'sword bean': 'الفاصوليا السيفية',
        'lima bean': 'الفاصوليا البيضاء',
        'kidney bean': 'الفاصوليا الحمراء',
        'navy bean': 'الفاصوليا البيضاء',
        'pinto bean': 'الفاصوليا المرقطة',
        'black bean': 'الفاصوليا السوداء',
        'white bean': 'الفاصوليا البيضاء',
        'red bean': 'الفاصوليا الحمراء',
        'yellow bean': 'الفاصوليا الصفراء',
        'green bean': 'الفاصوليا الخضراء',
        'wax bean': 'الفاصوليا الشمعية',
        'snap bean': 'الفاصوليا القابلة للكسر',
        'string bean': 'الفاصوليا الخيطية',
        'pole bean': 'الفاصوليا العمودية',
        'bush bean': 'الفاصوليا الشجيرية',
        'runner bean': 'الفاصوليا المتسلقة',
        'yardlong bean': 'الفاصوليا الطويلة',
        'asparagus bean': 'الفاصوليا الهليونية'
    };
    
    // Reset button functionality
    resetButton.addEventListener('click', function() {
        // Clear all input values
        inputs.forEach(input => {
            input.value = '';
            // Clear any error messages
            const errorMessage = document.getElementById(`${input.id}-error`);
            if (errorMessage) {
                errorMessage.textContent = '';
                errorMessage.classList.remove('active');
            }
        });
        
        // Clear the result section
        document.getElementById('result').innerHTML = '';
    });
    
    // Function to validate a single input
    function validateInput(input) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.min);
        const max = parseFloat(input.max);
        const errorMessage = document.getElementById(`${input.id}-error`);
        
        if (isNaN(value)) {
            errorMessage.textContent = `Please enter a number`;
            errorMessage.classList.add('active');
            return false;
        }
        
        if (value < min || value > max) {
            errorMessage.textContent = `Value must be between ${min} and ${max}`;
            errorMessage.classList.add('active');
            return false;
        }
        
        // Clear any previous error message
        errorMessage.textContent = '';
        errorMessage.classList.remove('active');
        return true;
    }
    
    // Add input validation
    inputs.forEach(input => {
        // Remove the browser's default validation
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
        });
        
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            document.getElementById('result').innerHTML = `
                <div style="background-color: #ffebee; padding: 1rem; border-radius: 4px;">
                    <h3 style="color: #c62828; margin-top: 0;">Validation Error</h3>
                    <p>Please correct the highlighted fields before submitting.</p>
                </div>
            `;
            return;
        }
        
        // Show loading indicator
        loadingIndicator.innerHTML = `
            <div class="loading-spinner"></div>
            <span>Processing your request...</span>
        `;
        loadingIndicator.classList.add('active');
        
        // Collect form data and convert to numbers
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = parseFloat(value);
        }
        
        try {
            // Send data to FastAPI backend
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            // Display top 5 crops with probabilities in a professional way
            const crops = result.recommended_crops;
            let cropsHtml = `
                <div class="prediction-result show">
                    <h3>Top 5 Recommended Crops</h3>
                    <ol style="padding-left: 1.5rem;">
                        ${crops.map(cropObj => `
                            <li style="margin-bottom: 0.7rem;">
                                <span style="font-weight:600;color:var(--primary-color);text-transform:capitalize;">${cropObj.crop}</span>
                                <span style="color:#666;margin-right:10px;">(${(cropObj.probability * 100).toFixed(1)}%)</span>
                                <span style="color:var(--secondary-color);font-weight:500;">${arabicCropNames[cropObj.crop.toLowerCase()] || cropObj.crop}</span>
                                <div style="background:#e0e0e0;border-radius:5px;overflow:hidden;height:10px;margin-top:4px;">
                                    <div style="background:linear-gradient(90deg,var(--primary-color),var(--secondary-color));width:${(cropObj.probability * 100).toFixed(1)}%;height:100%;"></div>
                                </div>
                            </li>
                        `).join('')}
                    </ol>
                </div>
            `;
            document.getElementById('result').innerHTML = cropsHtml;
        } catch (error) {
            document.getElementById('result').innerHTML = `
                <div style="background-color: #ffebee; padding: 1rem; border-radius: 4px;">
                    <h3 style="color: #c62828; margin-top: 0;">Error</h3>
                    <p>Sorry, there was an error processing your request. Please try again later.</p>
                </div>
            `;
            console.error('Error:', error);
        } finally {
            loadingIndicator.classList.remove('active');
            loadingIndicator.innerHTML = "Processing your request...";
        }
    });
});
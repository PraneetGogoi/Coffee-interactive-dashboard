<img width="1378" height="933" alt="Screenshot 2026-03-22 at 7 47 18 PM" src="https://github.com/user-attachments/assets/24e19df6-ccf9-40cc-9eb9-154fc8df75b5" />

# ☕ Brew Analytics: Full-Stack Coffee Sales Dashboard

An interactive, real-time full-stack web application designed to visualize and analyze global coffee retail data. This project transitions from a deep-dive exploratory data analysis (EDA) in Jupyter Notebooks to a production-ready dashboard.

## 🚀 Overview

The **Brew Analytics** dashboard provides stakeholders with actionable insights into sales performance, customer behavior, and product trends. By integrating a Flask-based REST API with a dynamic frontend, the system allows for real-time monitoring of key business metrics.

### Key Features

  * **Real-Time KPIs:** Instant visibility into Total Revenue, Order Volume, and Average Order Value.
  * **Interactive Visualization:** Dynamic charts for monthly sales trends and coffee type distribution using Chart.js.
  * **Geographic Insights:** Heatmap-style breakdown of revenue by country (US, UK, Ireland).
  * **Customer Analytics:** Identification of top 5 high-value customers and loyalty program impact.
  * **Predictive Context:** Backend integration for RFM (Recency, Frequency, Monetary) clustering and seasonal forecasting.

-----

## 🏗️ Architecture

The project follows a decoupled client-server architecture:

1.  **Backend (Python/Flask):** \* Processes raw Excel/CSV datasets.
      * Exposes RESTful endpoints for the frontend.
      * Handles statistical calculations (Mean, Median, T-Tests).
2.  **Frontend (HTML5/CSS3/JavaScript):**
      * Responsive UI built with Bootstrap.
      * Asynchronous data fetching via the Fetch API.
      * Interactive rendering via Canvas/Chart.js.

-----

## 🛠️ Installation & Setup

### Prerequisites

  * Python 3.8+
  * Pip (Python package manager)

### Step-by-Step

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/brew-analytics.git
    cd brew-analytics
    ```

2.  **Set up a virtual environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the application:**

    ```bash
    python app.py
    ```

    Access the dashboard at `http://127.0.0.1:5000`.

-----

## 📊 Data Insights (from `model.ipynb`)

Before the web implementation, an extensive analysis was conducted. Key findings include:

  * **Loyalty Impact:** Customers with loyalty cards contribute significantly higher average order values (statistically validated via Welch's t-test).
  * **Top Sellers:** Arabica and Robusta dominate the sales mix, with "Medium" roast being the most preferred.
  * **Market Concentration:** The United States represents the largest market share, followed by Ireland and the UK.

-----

## 📂 Project Structure

```text
├── app.py              # Flask Backend API
├── model.ipynb         # Data Science & Exploratory Analysis
├── data/               # Raw CSV/Excel datasets
├── templates/
│   └── index.html      # Main Dashboard UI
├── static/
│   ├── css/            # Custom styling
│   └── js/
│       └── dashboard.js # Frontend Logic & Charting
└── requirements.txt    # Project dependencies
```

-----

## 🤝 Contributing

Contributions are welcome\! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

-----

### Author

**Praneet Gogoi** *Aspiring AI Engineer | Technical Content Creator*

# Setup
# Import Libraries
from selenium import webdriver
from selenium.webdriver.common.by import By
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os

# Configure WebDriver
driver = webdriver.Chrome(executable_path='/usr/bin/chromedriver')

# Scrape Data
# Open Website
driver.get('https://www.legalni-bukmacherzy-online.pl/porownywarka-kursow/surebety/')

# Scrape Data
# Find Elements
data_elements = driver.find_elements(By.CSS_SELECTOR, 'your_selector')

# Extract Information
data = [element.text for element in data_elements]

# Condition
# Check Condition
if some_condition:
    # True
    # Scrape Additional Data
    # Find Elements
    additional_data_elements = driver.find_elements(By.CSS_SELECTOR, 'your_additional_selector')
    
    # Extract Information
    additional_data = [element.text for element in additional_data_elements]
else:
    # False
    # Set Additional Data to Empty List
    additional_data = []

# Send Email
# Prepare Email
# Set Sender, Receiver, and Password
sender_email = "your_email@example.com"
receiver_email = "recipient_email@example.com"
password = "your_email_password"

# Create MIME Message
msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = "Scraped Data"

# Add Scraped Data and Additional Data
body = f"Data: {data}\n\nAdditional Data: {additional_data}"
msg.attach(MIMEText(body, 'plain'))

# Connect to Email Server
server = smtplib.SMTP_SSL('smtp.gmail.com', 465)

# Authenticate
server.login(sender_email, password)

# Send Email
server.sendmail(sender_email, receiver_email, msg.as_string())

# Disconnect
server.quit()

# Cleanup
# Close WebDriver
driver.quit()

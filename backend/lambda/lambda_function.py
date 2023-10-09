import json
import requests

def lambda_handler(event, context):
    # Get the location from the input event
    location = event['location']

    api_key = 'your-key'

    # Construct the API URL for the weather data
    url = f'https://api.openweathermap.org/data/2.5/weather?q={location},br&appid={api_key}&lang=pt_br'


    try:
        # Make a GET request to the OpenWeatherMap API
        response = requests.get(url)

        # Check if the request was successful
        if response.status_code == 200:
            data = response.json()
            # Extract relevant weather information from the response
            weather_description = data['weather'][0]['description']
            temperature = data['main']['temp']
            humidity = data['main']['humidity']

            # Create a response object
            response_data = {
                'location': location,
                'description': weather_description,
                'temperature': temperature,
                'humidity': humidity
            }

            return {
                'statusCode': 200,
                'body': json.dumps(response_data)
            }
        else:
            # Handle the case where the request was not successful
            return {
                'statusCode': response.status_code,
                'body': response.text
            }
    except Exception as e:
        # Handle any exceptions that may occur during the request
        return {
            'statusCode': 500,
            'body': str(e)
        }

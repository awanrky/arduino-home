
//configuration for wifi
#define ADAFRUIT_CC3000_IRQ		2
#define ADAFRUIT_CC3000_VBAT	5
#define ADAFRUIT_CC3000_CS		10

#define WLAN_SSID 		"put-ssid-here"
#define WLAN_PASS		"put-password-here"
#define WLAN_SECURITY	WLAN_SEC_WPA2


#define IDLE_TIMEOUT_MS	3000


#define REST_API_SERVER_OCTET_1 192
#define REST_API_SERVER_OCTET_2 168
#define REST_API_SERVER_OCTET_3 13
#define REST_API_SERVER_OCTET_4 14
#define REST_API_SERVER_PORT    1337
#define REST_API_BASE_ROUTE     "/api/vi/arduino-home"
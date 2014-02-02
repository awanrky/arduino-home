// this is a template for creating a config.h file in the same directory
//

#define WLAN_SSID           "put-ssid-here"
#define WLAN_PASS           "put-password-here"

#define WLAN_SECURITY       WLAN_SEC_WPA2

#define AISA_WIFI_IRQ       3       // must be an interrupt pin

// these two can be any pins
#define AISA_WIFI_VBAT      5
#define AISA_WIFI_CS        10


#define IDLE_TIMEOUT_MS     3000


#define REST_API_SERVER_OCTET_1 192
#define REST_API_SERVER_OCTET_2 168
#define REST_API_SERVER_OCTET_3 13
#define REST_API_SERVER_OCTET_4 14
#define REST_API_SERVER_PORT    1337
#define REST_API_BASE_ROUTE     "/api/vi/arduino-home"
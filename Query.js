// Hotels Details
USE jcwd2302_hotels;

SELECT h.id, h.name, h.location, GROUP_CONCAT(hi.url, '') as images FROM hotels h
JOIN hotels_images hi ON h.id = hi.hotels_id
WHERE h.id = 1;

SET @searchIn = '2022-12-23 14:00:00', @searchOut = '2022-12-25 12:00:00';
SELECT hr.id, hr.name, hr.price, GROUP_CONCAT(DISTINCT ri.url, '') as url, 
hr.total_room, IFNULL(SUM(DISTINCT get_room_booked_by_date_range(@searchIn, @searchOut, t.checkin, t.checkout, t.hotels_rooms_id, t.total_room)), 0) as 
total_rooms_booked,
hr.total_room - IFNULL(SUM(DISTINCT get_room_booked_by_date_range(@searchIn, @searchOut, t.checkin, t.checkout, t.hotels_rooms_id, t.total_room)), 0) as 
total_rooms_available
FROM hotels_rooms hr
LEFT JOIN transactions t ON t.hotels_rooms_id = hr.id 
JOIN rooms_images ri ON hr.id = ri.hotelsrooms_id 
WHERE hr.hotels_id = 1
GROUP BY hr.id 
HAVING total_rooms_available > 0;
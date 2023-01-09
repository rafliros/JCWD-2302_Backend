-- GET TOTAL ROOMS EACH HOTEL
SELECT h.id, h.name, SUM(total_room) as total_rooms FROM hotels h
JOIN hotels_rooms hr ON h.id = hr.hotels_id
GROUP BY h.id;
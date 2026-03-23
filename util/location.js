const GOOGLE_API_KEY = 'PAIzaSyCKJ1V1_XA_Pvt2XxKefwUtnqRwElBGVVM_UNIRAJU'

export function getMapPreview(lat, lng) {
    const imagePreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng},NY&zoom=14&size=400x400&maptype=roadmap&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=${GOOGLE_API_KEY}`
    return imagePreview;
}
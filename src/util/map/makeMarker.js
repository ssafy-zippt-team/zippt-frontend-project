// 마커와 인포윈도우를 생성하는 유틸 함수
export function makeMarker({ mapInstance, aptList }) {
    if (!window.kakao?.maps || !mapInstance) return [];
  
    const { maps } = window.kakao;
    const markers = [];
  
    aptList.forEach(apt => {
      const position = new maps.LatLng(apt.latitude, apt.longitude);
      const marker = new maps.Marker({
        position,
        map: mapInstance,
        title: apt.aptSeq,
      });
  
      const infowindow = new maps.InfoWindow({
        content: `
          <div style="padding:5px">
            <strong>AptSeq:</strong> ${apt.aptSeq}<br/>
            <strong>평균가:</strong> ${apt.amountAvg.toLocaleString()}억 원
          </div>
        `,
      });
  
      maps.event.addListener(marker, "mouseover", () =>
        infowindow.open(mapInstance, marker)
      );
      maps.event.addListener(marker, "mouseout", () =>
        infowindow.close()
      );
  
      markers.push(marker);
    });
  
    return markers;
  }
  
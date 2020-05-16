$(() => {
  $.get('/api/ads', (ad) => {
    const { url, img } = ad;

    $('[data-ad]').append(`
      <a href="${url}">
        <img src="${img}"/>
      </a>
    `);
  });
});
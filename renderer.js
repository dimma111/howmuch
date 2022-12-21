const getCpuData = async () => {
    const response = await window.cpu.info()
    const information = document.getElementById('info-cpu')
    information.innerHTML = `
    <div class="info__item"><i class="fa-solid fa-minus"></i> Manufacturer: <b>${response.manufacturer}</b></div>
    <div class="info__item"><i class="fa-solid fa-minus"></i> Model: <b>${response.brand}</b></div>
    <div class="info__item"><i class="fa-solid fa-minus"></i> Threads: <b>${response.cores}</b></div>
    <div class="info__item"><i class="fa-solid fa-minus"></i> Cores: <b>${response.physicalCores}</b></div>
    <div class="info__item"><i class="fa-solid fa-minus"></i> Socket: <b>${response.socket}</b></div>
    `
}

const getGpuData = async () => {
    const response = await window.gpu.info()
    const information = document.getElementById('info-gpu');
    let allDevicesHTML = ``;
    for (let item of response.controllers) {
        allDevicesHTML += `
        <div class="info__item"><i class="fa-solid fa-minus"></i> Manufacturer: <b>${item.vendor}</b></div>
        <div class="info__item"><i class="fa-solid fa-minus"></i> Model: <b>${item.model}</b></div>
        <div class="info__item"><i class="fa-solid fa-minus"></i> VRAM: <b>${item.vram} MB</b></div>
        <hr>
        `;
    }

    information.innerHTML = allDevicesHTML;
}

const loadingAllData = async() => {
    screenPreloader(true);
    await getCpuData();
    await getGpuData();
    screenPreloader(false);
}

const screenPreloader = (show) => {
    if (show) {
        $('#backdrop').fadeIn();
        $('.lds-ring').fadeIn();
    } else {
        $('#backdrop').fadeOut();
        $('.lds-ring').fadeOut();
    }
}

loadingAllData();

new Vue({
    el: '#app',

    data: {
        pengirimanList: dummyData.pengirimanList,
        paket: dummyData.paket,
        tracking: dummyData.tracking,

        cariDO: '',
            hasilTracking: null,
            showModalForm: false,

        form: {
            nomorDO: '',
            nim: '',
            nama: '',
            ekspedisi: '',
            paket: '',
            tanggalKirim: new Date().toISOString().substr(0,10),
            total: 0
        }
    },

    computed: {
        selectedPaket(){
            return this.paket.find(item => item.kode === this.form.paket);
        },

        trackingList(){
            return Object.keys(this.tracking).map(key => {
                return {
                    nomorDO: key,
                    ...this.tracking[key]
                };
            });
        }
    },

    methods: {
        generateNomorDO(){
            let tahun = new Date().getFullYear();
            let prefix = `DO${tahun}-`;

            let jumlahTahunIni = Object.keys(this.tracking)
                .filter(key => key.startsWith(prefix))
                .length + 1;

            return `${prefix}${String(jumlahTahunIni).padStart(3, '1')}`;
        },

        tambahTracking(){
            if(
                this.form.nim === '' ||
                this.form.nama === '' ||
                this.form.ekspedisi === '' ||
                this.form.paket === '' ||
                this.form.tanggalKirim === ''
            ){
                alert("Semua data Delivery Order wajib diisi!");
                return;
            }

            let nomor = this.form.nomorDO;

            this.$set(this.tracking, nomor, {
                nim: this.form.nim,
                nama: this.form.nama,
                status: "Diproses",
                ekspedisi: this.form.ekspedisi,
                tanggalKirim: this.form.tanggalKirim,
                paket: this.form.paket,
                total: this.form.total,
                perjalanan: [
                    {
                        waktu: new Date().toLocaleString("id-ID"),
                        keterangan: "Delivery Order berhasil dibuat"
                    }
                ]
            });

            alert("Delivery Order berhasil ditambahkan dengan nomor " + nomor);

            this.resetForm();
            this.tutupModal();
        },

        resetForm(){
            this.form = {
                nomorDO: this.generateNomorDO(),
                nim: '',
                nama: '',
                ekspedisi: '',
                paket: '',
                tanggalKirim: new Date().toISOString().substr(0,10),
                total: 0
            };
        },

        cariTracking(){
            if(this.cariDO === ''){
                alert("Nomor DO wajib diisi!");
                return;
            }

            this.hasilTracking = this.tracking[this.cariDO];

            if(!this.hasilTracking){
                alert("Data tracking tidak ditemukan");
            }
        },

        formatRupiah(angka){
            return Number(angka).toLocaleString("id-ID");
        },

        bukaModalTambah(){
            this.resetForm();
            this.showModalForm = true;
        },

        tutupModal(){
            this.showModalForm = false;
        }
    },

    watch: {
        selectedPaket(newValue){
            if(newValue){
                this.form.total = newValue.harga;
            }else{
                this.form.total = 0;
            }
        }
    },

    mounted(){
        this.form.nomorDO = this.generateNomorDO();
    }
});
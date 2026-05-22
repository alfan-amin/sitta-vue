new Vue({
    el: '#app',

    data: {
        upbjjList: dummyData.upbjjList,
        kategoriList: dummyData.kategoriList,
        stok: dummyData.stok,

        filterUpbjj: '',
        filterKategori: '',
        sortBy: '',
        showMenipis: false,
        showKosong: false,

        form: {
            kode: '',
            judul: '',
            kategori: '',
            upbjj: '',
            lokasiRak: '',
            harga: '',
            qty: '',
            safety: '',
            catatanHTML: ''
        }
    },
    computed: {

        kategoriFiltered(){

            return this.kategoriList;

        },

        stokFiltered(){

            let data = [...this.stok];

            if(this.filterUpbjj){

                data = data.filter(item =>
                    item.upbjj === this.filterUpbjj
                );
            }

            if(this.filterKategori){

                data = data.filter(item =>
                    item.kategori === this.filterKategori
                );
            }

            if(this.showMenipis){

                data = data.filter(item =>
                    item.qty < item.safety && item.qty > 0
                );
            }
             if(this.showKosong){

                data = data.filter(item =>
                    item.qty === 0
                );
            }

            if(this.sortBy === 'judul'){

                data.sort((a,b)=>
                    a.judul.localeCompare(b.judul)
                );
            }

            if(this.sortBy === 'qty'){

                data.sort((a,b)=>a.qty-b.qty);
            }

            if(this.sortBy === 'harga'){

                data.sort((a,b)=>a.harga-b.harga);
            }

            return data;

        }

    },

    methods: {

        tambahData(){
            if(
                this.form.kode === '' ||
                this.form.judul === ''
            ){
                alert('Data wajib diisi');
                return;
            }

            this.stok.push({
                ...this.form
            });

            this.form = {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                harga: '',
                qty: '',
                safety: '',
                catatanHTML: ''
            };

        },
 resetFilter(){

            this.filterUpbjj = '';
            this.filterKategori = '';
            this.sortBy = '';
            this.showMenipis = false;
            this.showKosong = false;

        },

        editData(index){

            let qtyBaru = prompt(
                'Edit Qty:',
                this.stok[index].qty
            );

            if(qtyBaru !== null){

                this.stok[index].qty = Number(qtyBaru);

            }

        }

    },

    watch: {

        filterUpbjj(){
            console.log('Filter UPBJJ berubah');
        }

    }
    });
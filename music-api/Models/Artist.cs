using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MusicApps.Models
{
    public class Artist
    {
        [Key]
        public int ArtistID { get; set; }

        [Column(TypeName ="varchar(200)")]
        public string ArtistName { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string AlbumName { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string ImageURL { get; set; }
        public Nullable<System.DateTime> ReleaseDate { get; set; }

        [Column(TypeName = "numeric(10,2)")]
        public Nullable<double> Price { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string SampleURL { get; set; }
    }
}

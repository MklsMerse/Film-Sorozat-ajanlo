using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FilmFokuszBackEnd.Models;

public partial class FilmfokuszContext : DbContext
{
    public FilmfokuszContext()
    {
    }

    public FilmfokuszContext(DbContextOptions<FilmfokuszContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Filmek> Filmeks { get; set; }

    public virtual DbSet<Sorozatok> Sorozatoks { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Velemenyek> Velemenyeks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("SERVER=localhost;PORT=3306;DATABASE=filmfokusz;USER=root;PASSWORD=;SSL MODE=none;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Filmek>(entity =>
        {
            entity.HasKey(e => e.FilmId).HasName("PRIMARY");

            entity.ToTable("filmek");

            entity.Property(e => e.FilmId)
                .HasColumnType("int(11)")
                .HasColumnName("film_id");
            entity.Property(e => e.Cim)
                .HasMaxLength(64)
                .HasColumnName("cim");
            entity.Property(e => e.Ertekeles)
                .HasPrecision(10)
                .HasColumnName("ertekeles");
            entity.Property(e => e.FilmUrl)
                .HasMaxLength(255)
                .HasColumnName("film_url");
            entity.Property(e => e.Leiras)
                .HasColumnType("text")
                .HasColumnName("leiras");
            entity.Property(e => e.MegjelenesiDatum)
                .HasColumnType("date")
                .HasColumnName("megjelenesi_datum");
            entity.Property(e => e.Mufaj)
                .HasMaxLength(16)
                .HasColumnName("mufaj");
            entity.Property(e => e.Rendezo)
                .HasMaxLength(64)
                .HasColumnName("rendezo");
            entity.Property(e => e.Szereplok)
                .HasColumnType("text")
                .HasColumnName("szereplok");
        });

        modelBuilder.Entity<Sorozatok>(entity =>
        {
            entity.HasKey(e => e.SorozatId).HasName("PRIMARY");

            entity.ToTable("sorozatok");

            entity.Property(e => e.SorozatId)
                .HasColumnType("int(11)")
                .HasColumnName("sorozat_id");
            entity.Property(e => e.Cim)
                .HasMaxLength(64)
                .HasColumnName("cim");
            entity.Property(e => e.Ertekeles)
                .HasPrecision(10)
                .HasColumnName("ertekeles");
            entity.Property(e => e.EvadokSzama)
                .HasColumnType("int(2)")
                .HasColumnName("evadok_szama");
            entity.Property(e => e.Leiras)
                .HasColumnType("text")
                .HasColumnName("leiras");
            entity.Property(e => e.MegjelenesiDatum)
                .HasColumnType("date")
                .HasColumnName("megjelenesi_datum");
            entity.Property(e => e.Mufaj)
                .HasMaxLength(16)
                .HasColumnName("mufaj");
            entity.Property(e => e.Rendezo)
                .HasMaxLength(64)
                .HasColumnName("rendezo");
            entity.Property(e => e.SorozatUrl)
                .HasMaxLength(255)
                .HasColumnName("sorozat_url");
            entity.Property(e => e.Szereplok)
                .HasColumnType("text")
                .HasColumnName("szereplok");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Email, "Email").IsUnique();

            entity.HasIndex(e => e.PermissionId, "Jog");

            entity.HasIndex(e => e.LoginNev, "LoginNev").IsUnique();

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Email).HasMaxLength(64);
            entity.Property(e => e.Hash)
                .HasMaxLength(64)
                .HasColumnName("HASH");
            entity.Property(e => e.LoginNev).HasMaxLength(16);
            entity.Property(e => e.Name).HasMaxLength(64);
            entity.Property(e => e.PermissionId).HasColumnType("int(11)");
            entity.Property(e => e.ProfilePicturePath).HasMaxLength(64);
            entity.Property(e => e.Salt)
                .HasMaxLength(64)
                .HasColumnName("SALT");
        });

        modelBuilder.Entity<Velemenyek>(entity =>
        {
            entity.HasKey(e => e.VelemenyId).HasName("PRIMARY");

            entity.ToTable("velemenyek");

            entity.HasIndex(e => e.FelhasznaloId, "felhasznalo_id");

            entity.HasIndex(e => e.FilmId, "film_id");

            entity.HasIndex(e => e.SorozatId, "sorozat_id");

            entity.Property(e => e.VelemenyId)
                .HasColumnType("int(11)")
                .HasColumnName("velemeny_id");
            entity.Property(e => e.Ertekeles)
                .HasPrecision(10)
                .HasColumnName("ertekeles");
            entity.Property(e => e.FelhasznaloId)
                .HasColumnType("int(11)")
                .HasColumnName("felhasznalo_id");
            entity.Property(e => e.FilmId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("film_id");
            entity.Property(e => e.SorozatId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("sorozat_id");
            entity.Property(e => e.VelemenySzoveg)
                .HasColumnType("text")
                .HasColumnName("velemeny_szoveg");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

const MaterialIcon = ({ icon, size }: { icon: string; size: number }) => (
    <span className="material-symbols-outlined" style={{
        fontSize: size, 
        backgroundColor: "#fff",
        border: "1px solid #dcdcdc",
        boxShadow: "rgba(0,0,0,0.1) 0px 4px 4px",
    }}>
        {icon}
    </span>
);

export default MaterialIcon;